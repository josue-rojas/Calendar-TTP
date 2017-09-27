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
console.log('pgClient',connectionString)
pgClient.connect();


app.listen(8080);
console.log('listening on port 8080')
