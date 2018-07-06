var express = require( "express" );
var path = require( "path" );
var bodyParser = require( "body-parser" );
var MongoClient  = require( "mongodb" ).MongoClient;
var app = express();
require( "dotenv" ).config();
var router = require( "./routes/router.js" );
var port = process.env.PORT || 8000;
var db;

app.use( express.static( __dirname ) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded( { "extended": true } ) );

console.log( "MONGODB_URI", process.env.MONGODB_URI );

MongoClient.connect( process.env.MONGODB_URI, function mongoConnect( error, database ){
    if( error ){
        // Use fail.html
        app.get( "*", function getAll( request, response ){
            response.sendFile( path.resolve( "./fail.html" ) );
        } );

        console.log( "DATABASE ERROR", error );
    }
    else{
        db = database.db( process.env.DB_NAME );
        
        router( app, db );

        // Use index.html
        app.get( "*", function getAll( request, response ){
            response.sendFile( path.resolve( "./index.html" ) );
        } );

        app.listen( port );

        console.log( "listening to port:", port );
    }
} );
