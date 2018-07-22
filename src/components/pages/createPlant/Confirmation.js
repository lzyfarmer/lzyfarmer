// Libraries
import React from "react";

// Helpers
import uppercaseFirst from "helpers/uppercaseFirst.js";

// Data
import plantData from "data/plants.json";

class Confirmation extends React.Component{
    constructor( props ){
        super( props );
    };

    render(){
        return (
            <div className="createPlantMenu">
                <p>Please confirm that you want to create a plant with the following options:</p>
                <div className="confirmation">
                    <p><span className="green">Plant Type:</span> { uppercaseFirst( this.props.formValues.plantType ) }</p>
                    <p><span className="green">Grow Medium:</span> { plantData.growMedium[this.props.formValues.growMedium] }</p>
                    <p><span className="green">Sun Type:</span> { plantData.sun[this.props.formValues.sunType] }</p>
                </div>
                <button className="light" onClick={ () => this.props.savePlant() }>Save Plant</button>
            </div>
        );
    }
};

export default Confirmation;
