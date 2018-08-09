// Libraries
import React from "react";

class PlantAge extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "value": props.formValues.plantAge
        };
    };

    render(){
        return(
            <div className="createPlantMenu">
                <p>Please select the plant age:</p>
                <form>
                    <label>
                        <input type="radio" value="1" checked={ this.state.value === "1" } onChange={ this.updateValue.bind( this ) }/>
                        <p>Seed</p>
                    </label>
                    <label>
                        <input type="radio" value="2" checked={ this.state.value === "2" } onChange={ this.updateValue.bind( this ) }/>
                        <p>Young</p>
                    </label>
                    <label>
                        <input type="radio" value="3" checked={ this.state.value === "3" } onChange={ this.updateValue.bind( this ) }/>
                        <p>Mature</p>
                    </label>
                </form>
            </div>
        );
    };

    updateValue( event ){
        this.props.updateFormValues( {
            "plantAge": event.target.value
        } );

        this.setState( {
            "value": event.target.value
        } );
    };
};

export default PlantAge;
