// Libraries
import React from "react";

class PlantType extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "value": props.formValues.plantType
        };
    };

    render(){
        return(
            <div className="container column">
                <h1>Plant Type</h1>
                <select value={this.state.value} onChange={ this.updateValue.bind( this ) }>
                    <option value="1">Tomato</option>
                    <option value="2">Basil</option>
                    <option value="3">Lettuce</option>
                    <option value="4">Mint</option>
                </select>
                <button onClick={this.props.previousStep}>Previous</button>
                <button onClick={this.props.nextStep}>Next</button>
            </div>
        );
    };

    updateValue( event ){
        this.props.updateFormValues( {
            "plantType": event.target.value
        } );

        this.setState( {
            "value": event.target.value
        } );
    };
};

export default PlantType;
