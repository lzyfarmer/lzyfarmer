// Libraries
import React from "react";

class Setting extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "value": props.formValues.setting
        };
    };

    render(){
        return(
            <div className="createPlantMenu">
                <p>Please select the plant setting that you will use:</p>
                <form>
                    <label>
                        <input type="radio" value="1" checked={ this.state.value === "1" } onChange={ this.updateValue.bind( this ) }/>
                        <p>Container</p>
                    </label>
                    <label>
                        <input type="radio" value="2" checked={ this.state.value === "2" } onChange={ this.updateValue.bind( this ) }/>
                        <p>In-ground</p>
                    </label>
                </form>
            </div>
        );
    };

    updateValue( event ){
        this.props.updateFormValues( {
            "setting": event.target.value
        } );

        this.setState( {
            "value": event.target.value
        } );
    };
};

export default Setting;
