// Libraries
import React from "react";
import axios from "axios";
import moment from "moment";

// Helpers
import handleApiError from "helpers/handleApiError.js";

function formatDate( value ){
    return moment( value, "MM/DD/YYYY" );
}

class Plant extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "plantId": this.props.location.pathname.replace( "/plant/", "" ),
            "plant": {
                "nextWaterDate": 0,
                "nextHarvestDate": 0
            }
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
                    <p>lastWaterDate: {this.state.plant.lastWaterDate}</p>
                    <p>nextWaterDate: {this.state.plant.nextWaterDate}</p>
                    <p>lastHarvestDate: {this.state.plant.lastHarvestDate}</p>
                    <p>nextHarvestDate: {this.state.plant.nextHarvestDate}</p>
                    <button onClick={ this.handlePost.bind( this, "water" ) } disabled={true}>Water Plant</button>
                    <button onClick={ this.handlePost.bind( this, "harvest" ) } disabled={true}>Harvest Plant</button>
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
                console.log( "fetchPlant:response.data", response.data );
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

    calculateDisabledWater(){
        var next = new Date( this.state.plant.nextWaterDate );
        var now = Date.now();
        var bool = next >= now;

        console.log( "cDW:bool", bool );
        console.log( "cDW:next", next );
        console.log( "cDW:now", now );
        return bool;
    };

    calculateDisabledHarvest(){
        var next = new Date( this.state.plant.nextHarvestDate );
        var now = Date.now();
        var bool = next >= now;

        console.log( "cDH:bool", bool );
        console.log( "cDH:next", next );
        console.log( "cDH:now", now );
        return bool;
    };

    handlePost( type ){
        axios( {
            "method": "POST",
            "url": `/api/${type}Plant/${this.state.plantId}`,
            "headers": {
                "authorization": sessionStorage.getItem( "jwt" )
            }
        } )
        .then(
            ( response ) => {
                console.log( "savePlant:response.data", response.data );
                this.setState( {
                    "plant": response.data
                } );
            }
        );
    }
};

export default Plant;
