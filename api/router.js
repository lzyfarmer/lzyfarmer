var authenticationRoutes = require( "./routes/authentication.js" );
var userRoutes = require( "./routes/user.js" );

module.exports = function( app ){
    authenticationRoutes( app );

    userRoutes( app );
}
