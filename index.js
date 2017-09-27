// constants
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
// create table if none
pgClient.query("CREATE TABLE IF NOT EXISTS events(id SERIAL UNIQUE PRIMARY KEY, year INTEGER  NOT NULL, monthNum INTEGER NOT NULL, month CHAR(255) NOT NULL, day INTEGER NOT NULL, hourStart INTEGER  NOT NULL, minStart INTEGER NOT NULL, hourEnd INTEGER NOT NULL, minEnd INTEGER NOT NULL, priority INTEGER NOT NULL, description text NOT NULL)")

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
  res.render('calender', {date_end:LastDayOfMonth(thisYear, thisMonth), date_name_start:FirsDayNameOfMonth(thisYear, thisMonth), thisMonth:numToMonth(thisMonth), year:thisYear});
})

// current month if no query (month and year)
// SHOULD FIX TO NOT START AT 0
app.get('/date', (req, res) => {
  thisMonth =  !req.query.month ? (new Date()).getMonth() : req.query.month
  thisYear = !req.query.year ? (new Date()).getFullYear() : req.query.year
  res.render('calender', {date_end:LastDayOfMonth(thisYear, thisMonth), date_name_start:FirsDayNameOfMonth(thisYear, thisMonth), thisMonth:numToMonth(thisMonth), year:thisYear});
})

app.get('/*', (req, res) =>{
  res.redirect('/');
})

app.post('/event',(req, res) => {
  pgClient.query('INSERT INTO events(id, year, monthNum, month, day, hourStart, minStart, hourEnd, minEnd, priority, description) values(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',[req.body.year, req.body.monthNum, req.body.month, req.body.day, req.body.hourStart, req.body.minStart, req.body.hourEnd, req.body.minEnd, req.body.priority, req.body.description])
  res.end('{success : "Updated Successfully", "status" : 200}');
})

// ----------------------- start -----------------------
app.listen(process.env.PORT);
console.log('listening on port '+process.env.PORT)
