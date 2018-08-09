// Libraries
import React from "react";

class SoilType extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "value": props.formValues.soilType
        };
    };

    render(){
        return(
            <div className="createPlantMenu">
                <p>Please select the soil type that you will use:</p>
                <form>
                    <label>
                        <input type="radio" value="1" checked={ this.state.value === "1" } onChange={ this.updateValue.bind( this ) }/>
                        <p>Current in-ground Soil</p>
                    </label>
                    <label>
                        <input type="radio" value="2" checked={ this.state.value === "2" } onChange={ this.updateValue.bind( this ) }/>
                        <p>Top Soil</p>
                    </label>
                    <label>
                        <input type="radio" value="3" checked={ this.state.value === "3" } onChange={ this.updateValue.bind( this ) }/>
                        <p>Potting Mix</p>
                    </label>
                    <label>
                        <input type="radio" value="4" checked={ this.state.value === "4" } onChange={ this.updateValue.bind( this ) }/>
                        <p>Garden Soil</p>
                    </label>
                </form>
            </div>
        );
    };

    updateValue( event ){
        this.props.updateFormValues( {
            "soilType": event.target.value
        } );

        this.setState( {
            "value": event.target.value
        } );
    };
};

export default SoilType;
