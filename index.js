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
indexToMonth=['January','February', 'March', 'April', 'May', 'June', 'July', 'August','September','October','November','December']
// ----------------------- node stuff --------------------
var express = require('express');
const { Pool } = require('pg') //postgres
var parser = require('body-parser');
const app = express();

// ----------------------- setup ------------------------
app.use(express.static( "public" ));
app.use(parser.json());
app.set('view engine', 'ejs')
var connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString: connectionString,
})
// pgClient.connect();
// create table if none
pool.query("CREATE TABLE IF NOT EXISTS events(id SERIAL UNIQUE PRIMARY KEY, year INTEGER  NOT NULL, monthNum INTEGER NOT NULL, month VARCHAR(255) NOT NULL, day INTEGER NOT NULL, hourStart INTEGER  NOT NULL, minStart INTEGER NOT NULL, hourEnd INTEGER NOT NULL, minEnd INTEGER NOT NULL, priority INTEGER NOT NULL, description text NOT NULL)")

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

// ----------------------- routes -----------------------
// ALL ROUTES WITH QUERY NEEDS TO BE CHECKED IF IT WAS SUCCESSFUL
// current month and default route
app.get('/', (req, res, next) => {
  thisMonth = (new Date()).getMonth()
  thisYear = (new Date()).getFullYear()
  pool.query('SELECT * FROM events WHERE year='+ thisYear +' and monthNum='+thisMonth)
  .then(results => {
    res.render('calender', {date_end:LastDayOfMonth(thisYear, thisMonth), date_name_start:FirsDayNameOfMonth(thisYear, thisMonth), thisMonth:indexToMonth[thisMonth], year:thisYear, events:results.rows});})
  .catch(e => console.error(e.stack))
})

// current month if no query (month and year)
// SHOULD FIX TO NOT START AT 0
app.get('/date', (req, res) => {
  thisMonth =  !req.query.month ? (new Date()).getMonth() : req.query.month
  thisYear = !req.query.year ? (new Date()).getFullYear() : req.query.year
  pool.query('SELECT * FROM events WHERE year='+ thisYear +' and monthNum='+thisMonth)
  .then(results => {
    res.render('calender', {date_end:LastDayOfMonth(thisYear, thisMonth), date_name_start:FirsDayNameOfMonth(thisYear, thisMonth), thisMonth:indexToMonth[thisMonth], year:thisYear, events:results.rows});})
  .catch(e => console.error(e.stack))
})

// gets all the events
app.get('/events', (req,res) =>{
  pool.query('SELECT * FROM events')
  .then(results =>{
    res.end(JSON.stringify(results.rows))
  })
  .catch(e => console.error(e.stack))
})

// gets events specifi to query
app.get('/events/q', (req,res) =>{
  month =  !req.query.month ? '' : "month='"+req.query.month+"'"
  monthNum =  !req.query.monthN ? '' : 'monthNum='+req.query.monthN
  year =  !req.query.year ? '' : 'year='+req.query.year
  day =  !req.query.day ? '' : 'day='+req.query.day
  hours =  !req.query.hours ? '' : 'hourStart='+req.query.hours
  mins =  !req.query.mins ? '' : 'minStart='+req.query.mins
  houre =  !req.query.houre ? '' : 'hourEnd='+req.query.houre
  mine =  !req.query.mine ? '' : 'minEnd='+req.query.houre
  priority =  !req.query.priority ? '' : 'priority='+req.query.priority
  description =  !req.query.description ? '' : "description='"+req.query.description+"'" // maybe i should remove this one
  newQuery = [month, monthNum, year, day, hours, mins, houre, mine, priority, description].filter(function(w){return w.length > 0}).join(' and ')
  newQuery =  newQuery.length < 1 ? 'SELECT * FROM events' : 'SELECT * FROM events WHERE ' + newQuery
  console.log(newQuery)
  pool.query(newQuery)
  .then(results =>{
    res.end(JSON.stringify(results.rows))
  })
  .catch(e => console.error(e.stack))
})

//gets one to specific id
app.get('/events/:id', (req,res) =>{
  pool.query('SELECT * FROM events WHERE id=' + req.params.id)
  .then(results =>{
    res.end(JSON.stringify(results.rows))
  })
  .catch(e => console.error(e.stack))
})

//redirect all non existing pages to main (no 404)
app.get('/*', (req, res) =>{
  res.redirect('/');
})

//post new events
app.post('/events',(req, res) => {
  console.log('month', req.body.month)
  pool.query('INSERT INTO events(id, year, monthNum, month, day, hourStart, minStart, hourEnd, minEnd, priority, description) values(DEFAULT, $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',[req.body.year, req.body.monthNum, req.body.month, req.body.day, req.body.hourStart, req.body.minStart, req.body.hourEnd, req.body.minEnd, req.body.priority, req.body.description])
  res.end('{success : "Updated Successfully", "status" : 200}');
})

//update an event NEED TO TEST
app.post('/events/:id'(req,res) => {
  pool.query('UPDATE events SET year=$1, monthNum=$2, month=$3, day=$3, hourStart=$4, minStart=$5, hourEnd=$6, minEnd=$7, priority=$8, description=$9  WHERE id='+req.params.id,[req.body.year, req.body.monthNum, req.body.month, req.body.day, req.body.hourStart, req.body.minStart, req.body.hourEnd, req.body.minEnd, req.body.priority, req.body.description])
  res.end('{success : "Updated Successfully", "status" : 200}');
})
// deletes event
app.delete('/events/:id',(req, res) =>{
  pool.query("DELETE FROM events WHERE id="+req.params.id);
  res.end('{success : "Deleted Successfully", "status" : 200}');
})

// ----------------------- start -----------------------
app.listen(process.env.PORT);
console.log('listening on port '+process.env.PORT)
