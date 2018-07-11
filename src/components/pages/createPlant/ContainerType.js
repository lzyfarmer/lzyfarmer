// Libraries
import React from "react";

var ContainerType = ( props ) => (
    <div className="container">
        <h1>ContainerType</h1>
        <button onClick={props.previousStep}>Previous</button>
        <button onClick={props.nextStep}>Next</button>
    </div>
);

export default ContainerType;
