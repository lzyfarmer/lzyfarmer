// Libraries
import React from "react";

var Upsell = ( props ) => (
    <div className="createPlantMenu">
        <p>Do you have all the materials needed for planting? You will need a container, soil, and seeds.</p>
        <button className="light" onClick={ () => props.handleNavigate( "/store" ) }>Shop Now</button>
    </div>
);

export default Upsell;
