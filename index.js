// ----------------------- node stuff --------------------
var express = require('express');
var pg = require('pg'); //postgres
var parser = require('body-parser');
const app = express();

// ----------------------- setup ------------------------
app.use(express.static( "public" ));
app.use(parser.json());
app.set('view engine', 'ejs')
var connectionString = process.env.DATABASE_URL;
var pgClient = new pg.Client(connectionString);
pgClient.connect();

// ----------------------- functions --------------------
// note: months start at 0 so jan -> 0
function LastDayOfMonth(Year, Month) {
  var t= new Date(Year, Month);
  return (new Date(t.getFullYear(), t.getMonth() + 1, 0, 23, 59, 59)).getDate();
}
// return 0-6 representing day name of the first day
function FirsDayNameOfMonth(Year, Month) {
  return (new Date(Year, Month)).getDay()
}
function numToMonth(Month){
  return (['January','February', 'March', 'April', 'May', 'June', 'July', 'August','September','October','November','December'])[Month]
}
// ----------------------- routes -----------------------
// current month and default route
app.get('/', (req, res, next) => {
  thisMonth = (new Date()).getMonth()
  thisYear = (new Date()).getFullYear()
  res.render('calender', {date_end:LastDayOfMonth(thisYear, thisMonth), date_name_start:FirsDayNameOfMonth(thisYear, thisMonth), thisMonth:numToMonth(thisMonth)});
})

// current month if no query (month and year)
// SHOULD FIX TO NOT START AT 0
app.get('/date', (req, res) => {
  thisMonth =  !req.query.month ? (new Date()).getMonth() : req.query.month
  thisYear = !req.query.year ? (new Date()).getFullYear() : req.query.year
  res.render('calender', {date_end:LastDayOfMonth(thisYear, thisMonth), date_name_start:FirsDayNameOfMonth(thisYear, thisMonth), thisMonth:numToMonth(thisMonth)});
})


app.get('/*', (req, res) =>{
  res.redirect('/');
})


// ----------------------- start -----------------------
app.listen(process.env.PORT);
console.log('listening on port '+process.env.PORT)
