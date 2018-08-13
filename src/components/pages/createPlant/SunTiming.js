// Libraries
import React from "react";

class SunTiming extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "value": props.formValues.sunTiming
        };
    };

    render(){
        return(
            <div className="createPlantMenu">
                <p>Please select the time of day your plant will receive sun:</p>
                <form>
                    <label>
                        <input type="radio" value="1" checked={ this.state.value === "1" } onChange={ this.updateValue.bind( this ) }/>
                        <p>Morning Sun</p>
                    </label>
                    <label>
                        <input type="radio" value="2" checked={ this.state.value === "2" } onChange={ this.updateValue.bind( this ) }/>
                        <p>Afternoon Sun</p>
                    </label>
                    <label>
                        <input type="radio" value="3" checked={ this.state.value === "3" } onChange={ this.updateValue.bind( this ) }/>
                        <p>Do Not Know</p>
                    </label>
                </form>
            </div>
        );
    };

    updateValue( event ){
        this.props.updateFormValues( {
            "sunTiming": event.target.value
        } );

        this.setState( {
            "value": event.target.value
        } );
    };
};

export default SunTiming;
