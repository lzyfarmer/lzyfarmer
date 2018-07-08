var authenticationRoutes = require( "./authentication.js" );
var ensureAuthenticated = require( "./ensureAuthenticated.js" );

module.exports = function( app, database ){
  authenticationRoutes( app, database );
}
