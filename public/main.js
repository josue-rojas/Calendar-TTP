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
    }
    else{
      $(days[i]).addClass('no-date')
    }
  }
  $('.btn.priority').click(function(){disableButton(this)})
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
   $("#hour-start").find(':selected').text()
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
    url:'/event',
    datatype:'json',
    contentType: 'application/json',
    data: JSON.stringify(newData),
    success:function(res){
      window.location = window.location; //refresh
    }
  })
  console.log(newData)
}
