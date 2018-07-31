// Libraries
import React from "react";

var Upsell = ( props ) => (
    <div className="createPlantMenu">
        <p>Do you have all the materials needed for planting? You will need a container, soil, and seeds.</p>
        <button className="light" onClick={ () => { window.location = "https://amazon.com/plants"} }>Shop Now</button>
    </div>
);

export default Upsell;
