var authenticationRoutes = require( "./routes/authentication.js" );
var userRoutes = require( "./routes/user.js" );

module.exports = function( app, database ){
    authenticationRoutes( app, database );

    userRoutes( app, database );
}
