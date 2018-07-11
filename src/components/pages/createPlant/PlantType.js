// Libraries
import React from "react";

var PlantType = ( props ) => (
    <div className="container">
        <h1>PlantType</h1>
        <button onClick={props.previousStep}>Previous</button>
        <button onClick={props.nextStep}>Next</button>
    </div>
);

export default PlantType;
