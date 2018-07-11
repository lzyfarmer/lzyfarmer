// Libraries
import React from "react";

var Confirmation = ( props ) => (
    <div className="container">
        <h1>Confirmation</h1>
        <button onClick={ () => props.previousStep() }>Previous</button>
        <button onClick={ () => props.savePlant() }>Save Plant</button>
    </div>
);

export default Confirmation;
