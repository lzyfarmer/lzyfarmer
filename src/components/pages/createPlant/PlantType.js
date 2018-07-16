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
            <div>
                <h1>Plant Type</h1>
                <select value={this.state.value} onChange={ this.updateValue.bind( this ) }>
                    <option value="tomato">Tomato</option>
                    <option value="basil">Basil</option>
                    <option value="lettuce">Lettuce</option>
                    <option value="mint">Mint</option>
                </select>
            </div>
        );
    };

    updateValue( event ){
        console.log( "event.target.value", event.target.value );
        this.props.updateFormValues( {
            "plantType": event.target.value
        } );

        this.setState( {
            "value": event.target.value
        } );
    };
};

export default PlantType;
