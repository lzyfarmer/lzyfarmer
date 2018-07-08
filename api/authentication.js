var jwt = require( "jwt-simple" );

module.exports = function( app, database ){
  app.post( "/api/signup", function login( req, res ){
      var user = {
          "name": {
              "first": req.body.firstName,
              "last": req.body.lastName
          },
          "username": req.body.username,
          "password": req.body.password,
          "zipcode": req.body.zipcode
      };

      database.collection( "users" ).insert(
          user,
          function newUser( error, results ){
              if( error ){
                  res.send( {
                      "text": "ERROR CREATING USER",
                      "error": error
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
      var token;

      database.collection( "users" ).findOne(
          {
              "username": req.body.username
          },
          function findUser( error, user ){
              if( error ){
                  res.send( {
                      "text": "ERROR FINDING USER",
                      "error": errpr
                  } );
              }
              else{
                  if( req.body.password == user.password ){
                      token = jwt.encode(
                          {
                              "iss": user._id,
                              "random": "blah",
                              "exp": Date.now() + 3600000
                          },
                          process.env.TOKEN_SECRET
                      );
                  }
                  res.send( {
                      "text": "USER FOUND",
                      "user": user,
                      "token": token
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
