// Libraries
import React from "react";
import axios from "axios";

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
                    <h1>{this.state.plant.planttype.name}</h1>
                    <p>{this.state.plant.containerType}</p>
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
        axios.get( `/api/plant/${this.state.plantId}` ).then(
            ( response ) => {
                console.log( "response", response );
                this.setState( {
                    "plant": response.data
                } );
            }
        );

        axios( {
            "method": "GET",
            "url": `/api/plant/${this.state.plantId}`,
            "headers": {
                "authorization": localStorage.getItem( "jwt" )
            }
        } )
        .then(
            ( response ) => {
                console.log( "response", response );
                this.setState( {
                    "plant": response.data
                } );
            }
        );
    };
};

export default Plant;
