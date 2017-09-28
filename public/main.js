
// --------------------- constants & vars--------------------------
monthToIndex={
  'January': 0,
  'February': 1,
  'March': 2,
  'April': 3,
  'May': 4,
  'June': 5,
  'July': 6,
  'August': 7,
  'September': 8,
  'October': 9,
  'November': 10,
  'December':11
}
var year, month, day, curID;
var priority = 0 // 0 -> low, 1 -> medium, 2 -> high
//
const defaultEvents = "\
    <div class='row'>\
      <div class='col-md-1'></div>\
      <div class='col-md-7 events-table-cell month-name'>\
        <div class='events-date'></div>\
      </div>\
      <div class='col-md-1'></div>\
    </div>\
  <div class='row events-table'>\
    <div class='col-md-1'></div>\
    <div class='col-md-1 events-table-cell'>Start</div>\
    <div class='col-md-1 events-table-cell'>End</div>\
    <div class='col-md-1 events-table-cell'>Priority</div>\
    <div class='col-md-2 events-table-cell'>Description</div>\
    <div class='col-md-2 events-table-cell'></div>\
    <div class='col-md-1'></div>\
  </div>\
  "
const lastRow = "\
<div class='row'>\
  <div class='col-md-1'></div>\
  <div class='col-md-7 events-table-cell'>\
    <div class='extra-buttons'>\
      <button class='btn btn-outline-info' onclick='showForm()'>New</button>\
      <button class='btn btn-outline-warning' onclick='cancelNew()'>Cancel</button>\
    </div>\
  </div>\
  <div class='col-md-1'></div></div>\
</div>\
"

// --------------------- dom ready stuff --------------------------
// add on click to those with numbers and not the empty ones, and set constants
$( document ).ready(function() {
  $body = $('.body')
  year = $body.data('year')
  month = $body.data('month')
  var days = $('.date');
  for(var i = 0; i < days.length; i++){
    if(!($(days[i]).find('.day-number').length == 0)){
      $(days[i]).click(function(){eventsStuff(this)})
      $(days[i]).attr('low', '0')
      $(days[i]).attr('medium', '0')
      $(days[i]).attr('high', '0')
    }
    else{
      $(days[i]).addClass('no-date')
    }
  }
  $('.btn.priority').click(function(){disableButton(this)})


  //organize data(events)
  $events = $('.single-event')
  for(var e=0; e < $events.length; e++){
    eventday = $($events[e]).data('eventday')
    eventPrior = $($events[e]).data('priority')
    $calenderDay = $('.day-number[data-day="' + eventday + '"]').closest('.date')
    $calenderDay.addClass(' hasEvent')
    if(eventPrior == 'low'){
      low = parseInt($calenderDay.attr('low')) + 1
      $calenderDay.closest('.date').attr('low', low)
    }
    else if(eventPrior == 'medium'){
      medium = parseInt($calenderDay.attr('medium')) + 1
      $calenderDay.closest('.date').attr('medium', medium)

    }
    else if(eventPrior == 'high'){
      high = parseInt($calenderDay.attr('high')) + 1
      $calenderDay.closest('.date').attr('high', high)
    }
  }

  $days = $('.hasEvent')
  for(var d = 0; d < $days.length; d++){
    lowT = parseInt($($days[d]).attr('low'))
    mediumT = parseInt($($days[d]).attr('medium'))
    highT = parseInt($($days[d]).attr('high'))
    total = lowT + mediumT + highT
    lowPerc = (lowT / total) * 100
    medPerc = (mediumT / total) * 100
    highPerc = (highT / total) * 100
    $($days[d]).find('.low-bar').css('width', lowPerc + '%')
    $($days[d]).find('.medium-bar').css('width', medPerc + '%')
    $($days[d]).find('.high-bar').css('width', highPerc + '%')
  }
});

// --------------------- funtions (clicks and such) --------------------------
function changeCal(){
  window.location = ('/date?month=' + monthToIndex[$('#month-change').find(':selected').text()] + '&year=' + $('#year-change').find(':selected').text()).replace(' ', '')
}
function showChooser(show=true){
  if(show) {
    $('.calendar-wrapper .month-name').addClass('show-chooser')
    return
  }
  $('.calendar-wrapper .month-name').removeClass('show-chooser')
}
function cancelNew(){
  $('.events-table-wrapper').removeClass('show-events')
  $('.calendar-wrapper').removeClass('hide-calendar')
  $('.row.events').removeClass('show')
}
//this will set the priority
function disableButton(target){
  $('.btn.priority').removeClass('disabled')
  $(target).addClass('disabled')
  priority = $(target).data('priority')
}

function showForm(id=-1){
  curID = id
  if(id > -1){
    $eventData = $('[data-id='+id+']')
    $('#description').val($eventData.data('description'))
    $('#hour-start').val($eventData.data('hourstart'))
    $('#min-start').val($eventData.data('minstart'))
    $('#hour-end').val($eventData.data('hourend'))
    $('#min-end').val($eventData.data('minend'))
    disableButton('#'+$($eventData).data('priority'))

  }
  else{
    // set defaults
    $('#description').val('')
    $('#hour-start').val(0)
    $('#min-start').val(0)
    $('#hour-end').val(0)
    $('#min-end').val(0)
    disableButton('#low')
  }
  cancelNew()
  $('.calendar-wrapper').addClass('hide-calendar')
  $('.row.events').find('.events-date').text(month + ' ' + day + ', ' + year)
  $('.row.events').addClass('show')
}

// need to remove this
function editEvent(id){
  showForm(id)
}

// to show events and forms
function eventsStuff(target){
  $('.events-table-wrapper').html(defaultEvents)
  day = $(target).find('.day-number').data('day')
  $events = $('.events-table-wrapper')
  $events.find('.events-date').text(month + ' ' + day + ', ' + year)
  $dayEvents = $('.single-event[data-eventday="'+ day + '"]')
  html = ''
  for(var rowEvent = 0; rowEvent < $dayEvents.length; rowEvent++){
    $singleEvent = $($dayEvents[rowEvent])
    html += '<div class="row"> \
    <div class="col-md-1"></div> \
    <div class="col-md-1 events-table-cell">'
    + $singleEvent.data('hourstart')
    + ':'
    + ($singleEvent.data('minstart') > 9 ? $singleEvent.data('minstart') : ( '0' + $singleEvent.data('minstart')) )
    +' </div> \
    <div class="col-md-1 events-table-cell">'
    + $singleEvent.data('hourend')
    + ':'
    + ($singleEvent.data('minend') > 9 ? $singleEvent.data('minend') : ( '0' + $singleEvent.data('minend')) )
    + '</div>\
    <div class="col-md-1 events-table-cell priority-cell">\
    <div class="'
    + $singleEvent.data('priority')
    + '-circle priority-circle"></div></div>\
    <div class="col-md-2 events-table-cell">'
    + $singleEvent.data('description')
    +'</div> \
    <div class="col-md-2 events-table-cell">'
    + "<div class='event-buttons'>\
      <button class='btn btn-outline-success' onclick=editEvent("
      + $singleEvent.data('id')
      +")>Edit\
      </button>\
      <button class='btn btn-outline-danger' onclick='deleteEvent("
      + $singleEvent.data('id')
      +")'>Delete</button>\
    </div>"
    +'</div> \
    <div class="col-md-1"></div> \
    </div>';
  }
  $('.events-table-wrapper').append(html)
  $('.events-table-wrapper').append(lastRow)
  $events.addClass('show-events')
  $('.calendar-wrapper').addClass('hide-calendar')
}

function checkTimes(hS, mS, hE, mE){
  if(hS < hE || (hS == hE && mS < mE)) return true
  return false
}

// --------------------- api requests --------------------------
// api calls
//update or add new events
function submitNew(id=curID){
  hourStart=parseInt($("#hour-start").find(':selected').text())
  minStart=parseInt($("#min-start").find(':selected').text())
  hourEnd=parseInt($("#hour-end").find(':selected').text())
  minEnd=parseInt($("#min-end").find(':selected').text())
  if(!checkTimes(hourStart, minStart, hourEnd, minEnd)){
    alert("Time Doesn't Makes Sense!!")
    return
  }
  newData = {
    'year': year,
    'monthNum': monthToIndex[month],
    'month': month,
    'day': day,
    'hourStart':hourStart,
    'minStart': minStart,
    'hourEnd': hourEnd,
    'minEnd': minEnd,
    'description': $('#description').val(),
    'priority': parseInt(priority)
  }
  $.ajax({
    type:'POST',
    url:id==-1 ? '/events': '/events/'+id,
    datatype:'json',
    contentType: 'application/json',
    data: JSON.stringify(newData),
    success:function(res){
      window.location = window.location; //refresh
    }
  })
}

//delete events
function deleteEvent(curID){
  $.ajax({
    type:'DELETE',
    url:'/events/'+curID,
    datatype: 'json',
    success:function(res){
      window.location = window.location
    }
  })
}
