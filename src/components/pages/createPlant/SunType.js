// Libraries
import React from "react";

var SunType = ( props ) => (
    <div className="container">
        <h1>SunType</h1>
        <button onClick={props.previousStep}>Previous</button>
        <button onClick={props.nextStep}>Next</button>
    </div>
);

export default SunType;
