var ensureAuthenticated = require( "../ensureAuthenticated.js" );

module.exports = function( app, database ){
  app.get( "/api/user/:username", ensureAuthenticated, function user( req, res ){
      database.collection( "users" ).findOne(
          {
              "username": req.params.username
          },
          function findUser( error, user, extra ){
              if( error ){
                  res.status( 401 ).send( {
                      "text": "ERROR FINDING USER",
                      "error": errpr
                  } );
              }
              else if( user ){
                  res.send( {
                      "user": user
                  } );
              }
              else{
                  res.status( 401 ).send( {
                      "error": "USER NOT FOUND"
                  } );
              }
          }
      );
  } );
}
