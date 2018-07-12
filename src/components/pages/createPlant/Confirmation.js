// Libraries
import React from "react";

var Confirmation = ( props ) => (
    <div className="container column">
        <h1>Confirmation</h1>
        <p>Plant Type: { props.formValues.plantType }</p>
        <p>Container Type: { props.formValues.containerType }</p>
        <p>Sun Type: { props.formValues.sunType }</p>
        <button onClick={ () => props.previousStep() }>Previous</button>
        <button onClick={ () => props.savePlant() }>Save Plant</button>
    </div>
);

export default Confirmation;
