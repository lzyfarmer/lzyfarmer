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
            <div className="createPlantMenu">
                <p>Please select the type of light that your plant will receive:</p>
                <form>
                    <label>
                        <input type="radio" value="1" checked={ this.state.value === "1" } onChange={ this.updateValue.bind( this ) }/>
                        <img src="/src/images/Lpartialsun.png"/>
                        <p>Partial Sun</p>
                    </label>
                    <label>
                        <input type="radio" value="2" checked={ this.state.value === "2" } onChange={ this.updateValue.bind( this ) }/>
                        <img src="/src/images/Lfullsun.png"/>
                        <p>Full Sun</p>
                    </label>
                    <label>
                        <input type="radio" value="3" checked={ this.state.value === "3" } onChange={ this.updateValue.bind( this ) }/>
                        <img src="/src/images/Lartificial.png"/>
                        <p>Artificial</p>
                    </label>
                </form>
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
