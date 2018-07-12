// Libraries
import React from "react";

class SunType extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "value": props.formValues.sunType
        };
    };

    render(){
        return(
            <div className="container column">
                <h1>Sun Type</h1>
                <form>
                    <label><input type="radio" value="1" checked={ this.state.value === "1" } onChange={ this.updateValue.bind( this ) }/>Full Shade</label>
                    <label><input type="radio" value="2" checked={ this.state.value === "2" } onChange={ this.updateValue.bind( this ) }/>Partial Shade</label>
                    <label><input type="radio" value="3" checked={ this.state.value === "3" } onChange={ this.updateValue.bind( this ) }/>Full Sun</label>
                </form>
                <button onClick={this.props.previousStep}>Previous</button>
                <button onClick={this.props.nextStep}>Next</button>
            </div>
        );
    };

    updateValue( event ){
        this.props.updateFormValues( {
            "sunType": event.target.value
        } );

        this.setState( {
            "value": event.target.value
        } );
    };
};

export default SunType;
