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
                    <p><span className="green">Name:</span> { this.props.formValues.name }</p>
                    <p><span className="green">Plant Age:</span> { plantData.plantAge[this.props.formValues.plantAge] }</p>
                    <p><span className="green">Sun Type:</span> { plantData.sun[this.props.formValues.sunType] }</p>
                    <p><span className="green">Soil Type:</span> { plantData.soilType[this.props.formValues.soilType] }</p>
                    <p><span className="green">Location:</span> { plantData.location[this.props.formValues.location] }</p>
                    <p><span className="green">Setting:</span> { plantData.setting[this.props.formValues.setting] }</p>
                    <p><span className="green">Container Size:</span> { this.props.formValues.containerSize } inches</p>
                    <p><span className="green">Sun Timing:</span> { plantData.sunTiming[this.props.formValues.sunTiming] }</p>
                </div>
                <button className="light" onClick={ () => this.props.savePlant() }>Save Plant</button>
            </div>
        );
    }
};

export default Confirmation;
