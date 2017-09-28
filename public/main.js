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
var year, month, day;
var priority = 0 // 0 -> low, 1 -> medium, 2 -> high

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
    if(eventPrior == 0){
      low = parseInt($calenderDay.attr('low')) + 1
      $calenderDay.closest('.date').attr('low', low)
    }
    else if(eventPrior == 1){
      medium = parseInt($calenderDay.attr('medium')) + 1
      $calenderDay.closest('.date').attr('medium', medium)

    }
    else if(eventPrior == 2){
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
    $($days[d]).find('.low-bar').css('height', lowPerc + '%')
    $($days[d]).find('.medium-bar').css('height', medPerc + '%')
    $($days[d]).find('.high-bar').css('height', highPerc + '%')
  }
});

// --------------------- funtions (clicks and such) --------------------------
//this will set the priority
function disableButton(target){
  $('.btn.priority').removeClass('disabled')
  $(target).addClass('disabled')
  priority = $(target).data('priority')
}

// to show events and forms
function eventsStuff(target){
  day = $(target).find('.day-number').data('day')
  $events = $('.events')
  $events.find('.events-date').text(month + ' ' + day + ', ' + year)
  $events.addClass('show')
  // console.log(new Date(year, monthToIndex[month], day))
}

// --------------------- api requests --------------------------
// api calls
function submitNew(){
  newData = {
    'year': year,
    'monthNum': monthToIndex[month],
    'month': month,
    'day': day,
    'hourStart':parseInt($("#hour-start").find(':selected').text()),
    'minStart': parseInt($("#min-start").find(':selected').text()),
    'hourEnd':parseInt($("#hour-end").find(':selected').text()),
    'minEnd': parseInt($("#min-end").find(':selected').text()),
    'description': $('#description').val(),
    'priority': parseInt(priority)
  }
  $.ajax({
    type:'POST',
    url:'/events',
    datatype:'json',
    contentType: 'application/json',
    data: JSON.stringify(newData),
    success:function(res){
      window.location = window.location; //refresh
    }
  })
}
