var express = require('express');
var pg = require('pg'); //postgres
var parser = require('body-parser');
const app = express();

app.use(express.static( "public" )); //access pictures and suchs
app.use(parser.json());
//
app.set('view engine', 'ejs')
var connectionString = process.env.DATABASE_URL;
var pgClient = new pg.Client(connectionString);
pgClient.connect();


app.get('/', (req, res) => {
  res.render('main');
})

app.listen(process.env.PORT);
console.log('listening on port '+process.env.PORT)
