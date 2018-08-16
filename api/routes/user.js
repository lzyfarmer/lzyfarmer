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

  app.get( "/api/planttypes", ensureAuthenticated, function getTypes( req, res ){
      PlantTypeModel.find(
          {},
          function findPlantTypes( error, plantTypes ){
              if( error ){
                  res.status( 401 ).send( {
                      "text": "ERROR FINDING PLANTTYPES",
                      "error": error
                  } );
              }
              else if( plantTypes ){
                  res.send( plantTypes );
              }
              else{
                  res.status( 401 ).send( {
                      "error": "PLANTTYPES NOT FOUND"
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
              if( error ){
                  res.status( 401 ).send( {
                      "error": error,
                      "text": "findPlantType"
                  } );
              }
              else{
                  var newPlant = new PlantModel( {
                      "plantAge": req.body.form.plantAge,
                      "name": req.body.form.name,
                      "soilType": req.body.form.soilType,
                      "sunType": req.body.form.sunType,
                      "location": req.body.form.location,
                      "setting": req.body.form.setting,
                      "containerSize": req.body.form.containerSize,
                      "sunTiming": req.body.form.sunTiming,
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
                              res.status( 401 ).send( {
                                  "error": error,
                                  "text": "saveNewPlant"
                              } );
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
                                                      res.status( 401 ).send( {
                                                          "error": error,
                                                          "text": "saveUser"
                                                      } );
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

                  foundPlant.log.push( {
                      "type": "water",
                      "timestamp": Date.now()
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

                  foundPlant.log.push( {
                      "type": "harvest",
                      "timestamp": Date.now()
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

  app.post( "/api/nutrientsPlant/:id", ensureAuthenticated, function harvestPlant( req, res ){
      PlantModel.findOne(
          {
              "_id": req.params.id
          }
      ).populate( {
          "path": "planttype"
      } ).exec(
          function foundPlantToNutrient( error, foundPlant ){
              if( error ){
                  res.status( 401 ).send( {
                      "text": "ERROR FINDING PLANT",
                      "error": error
                  } );
              }
              else if( foundPlant ){
                  foundPlant.log.push( {
                      "type": "nutrients",
                      "timestamp": Date.now()
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

  app.post( "/api/maintenancePlant/:id", ensureAuthenticated, function harvestPlant( req, res ){
      PlantModel.findOne(
          {
              "_id": req.params.id
          }
      ).populate( {
          "path": "planttype"
      } ).exec(
          function foundPlantToMaintenance( error, foundPlant ){
              if( error ){
                  res.status( 401 ).send( {
                      "text": "ERROR FINDING PLANT",
                      "error": error
                  } );
              }
              else if( foundPlant ){
                  foundPlant.log.push( {
                      "type": "maintenance",
                      "timestamp": Date.now()
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

  app.post( "/api/deletePlant/:id", ensureAuthenticated, function deletePlant( req, res ){
      PlantModel.deleteOne(
          {
              "_id": req.params.id
          },
          function foundPlantToDelete( error ){
              if( error ){
                  res.status( 401 ).send( {
                      "text": "ERROR DELETING PLANT",
                      "error": error
                  } );
              }
              else{
                  res.status( 200 ).send();
              }
          }
      );
  } );
}
