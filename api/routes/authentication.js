var jwt = require( "jwt-simple" );
var UserModel = require( "../models/User.js" );

module.exports = function( app ){
  app.post( "/api/signup", function login( req, res ){
      var newUser = new UserModel( {
          "username": req.body.username,
          "password": req.body.password,
          "zipcode": req.body.zipcode
      } );

      UserModel.findOne(
          {
              "username": req.body.username
          },
          function findUser( error, user ){
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
                  newUser.save(
                      function newUser( error, createdUser ){
                          if( error ){
                              res.send( {
                                  "text": "ERROR CREATING USER",
                                  "error": error
                              } );
                          }
                          else{
                              token = jwt.encode(
                                  {
                                      "issuer": createdUser._id,
                                      "exp": Date.now() + 3600000
                                  },
                                  process.env.TOKEN_SECRET
                              );

                              res.send( {
                                  "token": token,
                                  "user": createdUser
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

      UserModel.findOne(
          {
              "username": req.body.username
          },
          function findUser( error, user ){
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

                      res.send( {
                          "user": user,
                          "token": token
                      } );
                  }
                  else{
                      res.status( 401 ).send( {
                          "error": "BAD PASSWORD"
                      } );
                  }
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
