// Libraries
import React from "react";
import axios from "axios";

// Helpers
import uppercaseFirst from "helpers/uppercaseFirst.js";

class PlantType extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "value": props.formValues.plantType,
            "types": []
        };
    };

    componentDidMount(){
        this.fetchTypes();
    };

    render(){
        return(
            <div className="createPlantMenu wide">
                <p>Please select the type of plant that you would like to grow:</p>
                <select value={this.state.value} onChange={ this.updateValue.bind( this ) }>
                {
                    this.state.types.map(
                        ( type, i ) => <option value={type.name} key={i}>{uppercaseFirst(type.name)}</option>
                    )
                }
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

    fetchTypes(){
        axios( {
            "method": "GET",
            "url": `/api/planttypes`,
            "headers": {
                "authorization": sessionStorage.getItem( "jwt" )
            }
        } )
        .then(
            ( response ) => {
                this.setState( {
                    "types": response.data
                } );
            }
        )
        .catch(
            ( error ) => {
                handleApiError( error, this.props );
            }
        )
    };
};

export default PlantType;
