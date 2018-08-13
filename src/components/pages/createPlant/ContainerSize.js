// Libraries
import React from "react";

class ContainerSize extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "value": props.formValues.containerSize
        };
    };

    render(){
        return(
            <div className="createPlantMenu">
                <p>Please enter ( in inches ) the container size you will use. If you are not using a container, leave it at 0:</p>
                <form>
                    <label>
                        <input value={ this.state.value } onChange={ this.updateValue.bind( this ) }/>
                    </label>
                </form>
            </div>
        );
    };

    updateValue( event ){
        this.props.updateFormValues( {
            "containerSize": event.target.value
        } );

        this.setState( {
            "value": event.target.value
        } );
    };
};

export default ContainerSize;
