var express = require( "express" );
var path = require( "path" );
var app = express();

var port = process.env.PORT || 3000;

app.use( express.static( __dirname ) );

/* eslint-disable no-console */
console.log( "app", app );

// Routes
app.get( "*", function getAll( request, response ){
    response.sendFile( path.resolve( "./index.html" ) );
} );

// Setup
app.listen( port, function listenServer(){
    /* eslint-disable no-console */
    console.log( "Listening on port 3000" );
} );
