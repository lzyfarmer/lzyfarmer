var mongoose = require( "mongoose" );
var Schema = mongoose.Schema;

// Define our model
var plantSchema = new Schema(
    {
        "growMedium": String,
        "sunType": String,
        "health": Number,
        "lastWaterDate": Date,
        "nextWaterDate": Date,
        "lastHarvestDate": Date,
        "nextHarvestDate": Date,
        "planttype": { "type" : Schema.Types.ObjectId, "ref": "planttype" },
        "daysOld": Number,
        "datePlanted": Date
    },
    { "usePushEach": true }
);

// Create the model class
var PlantModel = mongoose.model( "Plant", plantSchema );

// Export the model
module.exports = PlantModel;
