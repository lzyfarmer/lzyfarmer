var express = require( "express" );
var path = require( "path" );
var app = express();

app.use( express.static( __dirname ) );

/* eslint-disable no-console */
console.log( "app", app );

// Routes
app.get( "*", function getAll( request, response ){
    response.sendFile( path.resolve( "./index.html" ) );
} );

// Setup
app.listen( 3000, function listenServer(){
    /* eslint-disable no-console */
    console.log( "Listening on port 3000" );
} );
