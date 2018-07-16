// Libraries
import React from "react";
import axios from "axios";

// Helpers
import handleApiError from "helpers/handleApiError.js";

class Plant extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "plantId": this.props.location.pathname.replace( "/plant/", "" ),
            "plant": {}
        }
    };

    componentDidMount(){
        this.fetchPlant();
    };

    render(){
        if( this.state.plant.planttype ){
            return (
                <div className="container column">
                    <h1>plantType: {this.state.plant.planttype.name}</h1>
                    <p>containerType: {this.state.plant.containerType}</p>
                    <p>sunType: {this.state.plant.sunType}</p>
                </div>
            );
        }
        else{
            return (
                <div className="container column"></div>
            );
        }
    };

    fetchPlant(){
        axios( {
            "method": "GET",
            "url": `/api/plant/${this.state.plantId}`,
            "headers": {
                "authorization": sessionStorage.getItem( "jwt" )
            }
        } )
        .then(
            ( response ) => {
                this.setState( {
                    "plant": response.data
                } );
            }
        )
        .catch(
            ( error ) => {
                handleApiError( error, this.props );
            }
        );
    };
};

export default Plant;
