// Libraries
import React from "react";

var Confirmation = ( props ) => (
    <div>
        <h1>Confirmation</h1>
        <p>Plant Type: { props.formValues.plantType }</p>
        <p>Container Type: { props.formValues.containerType }</p>
        <p>Sun Type: { props.formValues.sunType }</p>
    </div>
);

export default Confirmation;
