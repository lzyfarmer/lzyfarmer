// Libraries
import React from "react";

class Location extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "value": props.formValues.location
        };
    };

    render(){
        return(
            <div className="createPlantMenu">
                <p>Please select the soil type that you will use:</p>
                <form>
                    <label>
                        <input type="radio" value="1" checked={ this.state.value === "1" } onChange={ this.updateValue.bind( this ) }/>
                        <p>Outdoors</p>
                    </label>
                    <label>
                        <input type="radio" value="2" checked={ this.state.value === "2" } onChange={ this.updateValue.bind( this ) }/>
                        <p>Outdoors( covered )</p>
                    </label>
                    <label>
                        <input type="radio" value="3" checked={ this.state.value === "3" } onChange={ this.updateValue.bind( this ) }/>
                        <p>Indoors</p>
                    </label>
                </form>
            </div>
        );
    };

    updateValue( event ){
        this.props.updateFormValues( {
            "location": event.target.value
        } );

        this.setState( {
            "value": event.target.value
        } );
    };
};

export default Location;
