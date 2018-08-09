var mongoose = require( "mongoose" );
var Schema = mongoose.Schema;

// Define our model
var userSchema = new Schema(
    {
        "username": String,
        "email": String,
        "password": String,
        "zipcode": String,
        "plants": [ { "type" : Schema.Types.ObjectId, "ref": "Plant" } ]
    },
    { "usePushEach": true }
);

// Create the model class
var UserModel = mongoose.model( "User", userSchema );

// Export the model
module.exports = UserModel;
