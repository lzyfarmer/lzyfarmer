var ensureAuthenticated = require( "../ensureAuthenticated.js" );
var UserModel = require( "../models/User.js" );
var PlantModel = require( "../models/Plant.js" );
var PlantTypeModel = require( "../models/PlantType.js" );

module.exports = function( app ){
  app.get( "/api/user/:username", ensureAuthenticated, function user( req, res ){
      UserModel.findOne(
          {
              "username": req.params.username
          },
          function findUser( error, user ){
              if( error ){
                  res.status( 401 ).send( {
                      "text": "ERROR FINDING USER",
                      "error": error
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

  app.get( "/api/:username/plants", ensureAuthenticated, function getUserPlants( req, res ){
      UserModel.findOne(
          {
              "username": req.params.username
          }
      ).populate( {
          "path": "plants",
          "populate": {
              "path": "planttype"
          }
      } ).exec(
          function findUserPlants( error, user ){
              if( error ){
                  res.status( 401 ).send( {
                      "text": "ERROR FINDING USER",
                      "error": error
                  } );
              }
              else if( user ){
                  res.send( user.plants );
              }
              else{
                  res.status( 401 ).send( {
                      "error": "USER NOT FOUND"
                  } );
              }
          }
      );
  } );

  app.get( "/api/plant/:id", ensureAuthenticated, function getUserPlants( req, res ){
      PlantModel.findOne(
          {
              "_id": req.params.id
          }
      ).populate( {
          "path": "planttype"
      } ).exec(
          function findPlant( error, foundPlant ){
              if( error ){
                  res.status( 401 ).send( {
                      "text": "ERROR FINDING USER",
                      "error": error
                  } );
              }
              else if( foundPlant ){
                  res.send( foundPlant );
              }
              else{
                  res.status( 401 ).send( {
                      "error": "PLANT NOT FOUND"
                  } );
              }
          }
      );
  } );

  app.post( "/api/plants/:username", ensureAuthenticated, function newPlant( req, res ){
      PlantTypeModel.findOne(
          {
              "name": req.body.form.plantType
          },
          function findPlantType( error, plantType ){
              console.log( "plantType", plantType );
              if( error ){
                  res.status( 401 ).send();
              }
              else{
                  var newPlant = new PlantModel( {
                      "containerType": req.body.form.containerType,
                      "sunType": req.body.form.sunType,
                      "health": 0,
                      "lastWaterDate": Date.now(),
                      "nextWaterDate": Date.now() + plantType.waterRate,
                      "lastHarvestDate": Date.now(),
                      "nextHarvestDate": Date.now() + plantType.harvestRate,
                      "daysOld": 0,
                      "datePlanted": Date.now(),
                      "planttype": plantType._id
                  } );

                  newPlant.save(
                      function newPlant( error, createdPlant ){
                          if( error ){
                              res.status( 401 ).send();
                          }
                          else{
                              UserModel.findOne(
                                  {
                                      "username": req.params.username
                                  },
                                  function findUser( error, user ){
                                      if( error ){
                                          res.status( 401 ).send( {
                                              "text": "ERROR FINDING USER",
                                              "error": error
                                          } );
                                      }
                                      else if( user ){
                                          user.plants.push( createdPlant._id );

                                          user.save(
                                              function saveUser( error, user ){
                                                  if( error ){
                                                      res.status( 401 ).send();
                                                  }
                                                  else{
                                                      res.send( user );
                                                  }
                                              }
                                          );
                                      }
                                      else{
                                          res.status( 401 ).send( {
                                              "error": "USER NOT FOUND"
                                          } );
                                      }
                                  }
                              );
                          }
                      }
                  );
              }
          }
      )
  } );

  app.post( "/api/waterPlant/:id", ensureAuthenticated, function waterPlant( req, res ){
      PlantModel.findOne(
          {
              "_id": req.params.id
          }
      ).populate( {
          "path": "planttype"
      } ).exec(
          function foundPlantToWater( error, foundPlant ){
              if( error ){
                  res.status( 401 ).send( {
                      "text": "ERROR FINDING PLANT",
                      "error": error
                  } );
              }
              else if( foundPlant ){
                  foundPlant.set( {
                      "lastWaterDate": Date.now(),
                      "nextWaterDate": Date.now() + foundPlant.planttype.waterRate
                  } );

                  foundPlant.save(
                      function saveUser( error, savedPlant ){
                          if( error ){
                              res.status( 401 ).send();
                          }
                          else{
                              res.send( savedPlant );
                          }
                      }
                  );
              }
              else{
                  res.status( 401 ).send( {
                      "error": "PLANT NOT FOUND"
                  } );
              }
          }
      );
  } );

  app.post( "/api/harvestPlant/:id", ensureAuthenticated, function harvestPlant( req, res ){
      PlantModel.findOne(
          {
              "_id": req.params.id
          }
      ).populate( {
          "path": "planttype"
      } ).exec(
          function foundPlantToHarvest( error, foundPlant ){
              if( error ){
                  res.status( 401 ).send( {
                      "text": "ERROR FINDING PLANT",
                      "error": error
                  } );
              }
              else if( foundPlant ){
                  foundPlant.set( {
                      "lastHarvestDate": Date.now(),
                      "nextHarvestDate": Date.now() + foundPlant.planttype.harvestRate
                  } );

                  foundPlant.save(
                      function saveUser( error, savedPlant ){
                          if( error ){
                              res.status( 401 ).send();
                          }
                          else{
                              res.send( savedPlant );
                          }
                      }
                  );
              }
              else{
                  res.status( 401 ).send( {
                      "error": "PLANT NOT FOUND"
                  } );
              }
          }
      );
  } );
}
