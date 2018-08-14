// Libraries
import React from "react";

class Name extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "value": props.formValues.name
        };
    };

    render(){
        return(
            <div className="createPlantMenu">
                <p>Please enter a unique name for this plant. This will help to identify it from other plants of the same type:</p>
                <form>
                    <label>
                        <input placeholder="Custom Name" value={ this.state.value } onChange={ this.updateValue.bind( this ) }/>
                    </label>
                </form>
            </div>
        );
    };

    updateValue( event ){
        this.props.updateFormValues( {
            "name": event.target.value
        } );

        this.setState( {
            "value": event.target.value
        } );
    };
};

export default Name;
