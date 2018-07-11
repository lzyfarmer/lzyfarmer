// Libraries
import React from "react";

var Upsell = ( props ) => (
    <div className="container">
        <h1>Upsell</h1>
        <button onClick={ () => props.nextStep() }>Next</button>
    </div>
);

export default Upsell;
