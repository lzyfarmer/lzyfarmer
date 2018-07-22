// Libraries
import React from "react";

class GrowMedium extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "value": props.formValues.growMedium
        };
    };

    render(){
        return(
            <div className="createPlantMenu">
                <p>Please select the grow medium that you will use:</p>
                <form>
                    <label>
                        <input type="radio" value="1" checked={ this.state.value === "1" } onChange={ this.updateValue.bind( this ) }/>
                        <img src="/src/images/GMsoil.png"/>
                        <p>Soil</p>
                    </label>
                    <label>
                        <input type="radio" value="2" checked={ this.state.value === "2" } onChange={ this.updateValue.bind( this ) }/>
                        <img src="/src/images/GMhydroponic.png"/>
                        <p>Hydroponic</p>
                    </label>
                </form>
            </div>
        );
    };

    updateValue( event ){
        this.props.updateFormValues( {
            "growMedium": event.target.value
        } );

        this.setState( {
            "value": event.target.value
        } );
    };
};

export default GrowMedium;
