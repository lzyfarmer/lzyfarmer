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
            <div className="createPlantMenu wide">
                <p>Please select the type of plant that you would like to grow:</p>
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
        this.props.updateFormValues( {
            "plantType": event.target.value
        } );

        this.setState( {
            "value": event.target.value
        } );
    };
};

export default PlantType;
