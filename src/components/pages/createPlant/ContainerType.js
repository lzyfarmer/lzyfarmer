// Libraries
import React from "react";

class ContainerType extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "value": props.formValues.containerType
        };
    };

    render(){
        return(
            <div className="container column">
                <h1>Container Type</h1>
                <form>
                    <label><input type="radio" value="1" checked={ this.state.value === "1" } onChange={ this.updateValue.bind( this ) }/>Small Container</label>
                    <label><input type="radio" value="2" checked={ this.state.value === "2" } onChange={ this.updateValue.bind( this ) }/>Large Container</label>
                    <label><input type="radio" value="3" checked={ this.state.value === "3" } onChange={ this.updateValue.bind( this ) }/>In the Ground</label>
                </form>
                <button onClick={this.props.previousStep}>Previous</button>
                <button onClick={this.props.nextStep}>Next</button>
            </div>
        );
    };

    updateValue( event ){
        this.props.updateFormValues( {
            "containerType": event.target.value
        } );

        this.setState( {
            "value": event.target.value
        } );
    };
};

export default ContainerType;
