var mongoose = require( "mongoose" );
var Schema = mongoose.Schema;

// Define our model
var plantTypeSchema = new Schema(
    {
        "waterRate": Number,
        "harvestRate": Number,
        "harvestAge": Number,
        "youthCutoff": Number,
        "matureCutoff": Number,
        "latinName": String,
        "name": String
    },
    { "usePushEach": true }
);

// Create the model class
var PlantTypeModel = mongoose.model( "planttype", plantTypeSchema );

// Export the model
module.exports = PlantTypeModel;
