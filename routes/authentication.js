module.exports = function( app, database ){
  app.post( "/api/newUser", function login( req, res ){
      var user = {
          "name": {
              "first": req.body.firstName,
              "last": req.body.lastName
          },
          "username": req.body.username,
          "zipcode": req.body.zipcode
      };

      database.collection( "users" ).insert(
          user,
          function newUser( error, results ){
              if( error ){
                  res.send( {
                      "text": "ERROR CREATING USER"
                  } );
              }
              else{
                  res.send( {
                      "text": "USER CREATED",
                      "results": results.ops[0]
                  } );
              }
          }
      );
  } );

  app.post( "/api/login", function login( req, res ){
      database.collection( "users" ).findOne(
          {
              "username": req.body.username
          },
          function findUser( error, user ){
              if( error ){
                  res.send( {
                      "text": "ERROR FINDING USER"
                  } );
              }
              else{
                  res.send( {
                      "text": "USER FOUND",
                      "user": user
                  } );
              }
          }
      );
  } );

  app.post( "/api/logout", function login( req, res ){
      res.send( {
          "text": "POST /api/logout"
      } );
  } );
}
