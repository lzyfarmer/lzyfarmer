// Libraries
import React from "react";

var Upsell = ( props ) => (
    <div>
        <h1>Upsell</h1>
        <p>Do you have all the materials needed for planting? You will need a container, soil, and seeds.</p>
        <button onClick={ () => props.handleNavigate( "/store" ) }>Shop Now</button>
    </div>
);

export default Upsell;
