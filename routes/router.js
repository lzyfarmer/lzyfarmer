var authenticationRoutes = require( "./authentication.js" );

module.exports = function( app, database ){
  authenticationRoutes( app, database );
}
