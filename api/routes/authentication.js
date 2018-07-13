var jwt = require( "jwt-simple" );

module.exports = function( app, database ){
  app.post( "/api/signup", function login( req, res ){
      var user = {
          "username": req.body.username,
          "password": req.body.password,
          "zipcode": req.body.zipcode
      };

      database.collection( "users" ).findOne(
          {
              "username": req.body.username
          },
          function findUser( error, user, extra ){
              if( error ){
                  res.status( 401 ).send( {
                      "text": "ERROR FINDING USER",
                      "error": errpr
                  } );
              }
              else if( user ){
                  res.status( 409 ).send( "Username unavailable" );
              }
              else{
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
                              token = jwt.encode(
                                  {
                                      "issuer": results.ops[0]._id,
                                      "exp": Date.now() + 3600000
                                  },
                                  process.env.TOKEN_SECRET
                              );

                              res.send( {
                                  "token": token,
                                  "user": results.ops[0]
                              } );
                          }
                      }
                  );
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
          function findUser( error, user, extra ){
              if( error ){
                  res.status( 401 ).send( {
                      "text": "ERROR FINDING USER",
                      "error": errpr
                  } );
              }
              else if( user ){
                  if( req.body.password === user.password ){
                      token = jwt.encode(
                          {
                              "issuer": user._id,
                              "exp": Date.now() + 3600000
                          },
                          process.env.TOKEN_SECRET
                      );
                  }
                  res.send( {
                      "user": user,
                      "token": token
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

  app.get( "/api/checkAuth", function checkAuth( request, response ) {
      var token;
      var payload = null;

      // If no JWT request headers, throw error
      if( !request.headers["authorization"] ){
          return response.status( 401 ).send( {
              "error": "TOKEN MISSING"
          } );
      }

      token = request.headers["authorization"];

      // See if the token can be decoded as a JWT
      try{
          payload = jwt.decode( token, process.env.TOKEN_SECRET );

          console.log( "payload", payload );
      }
      catch( error ){
          return response.status( 401 ).send( {
              "error": "TOKEN INVALID"
          } );
      }

      // Check if token is expired
      if( payload.exp <= Date.now() ){
          return response.status( 401 ).send( {
              "error": "TOKEN EXPIRED"
          } );
      }

      return response.status( 200 ).send( {
          "text": "LOGGED IN"
      } );
  } );

  app.post( "/api/logout", function login( req, res ){
      res.send( {
          "text": "POST /api/logout"
      } );
  } );
}
