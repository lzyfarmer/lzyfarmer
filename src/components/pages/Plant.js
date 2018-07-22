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
        var nextWaterDate = new Date( this.state.plant.nextWaterDate );
        var nextHarvestDate = new Date( this.state.plant.nextHarvestDate );
        var now = new Date();
        var canWater = nextWaterDate <= now;
        var canHarvest = nextHarvestDate <= now;

        if( this.state.plant.planttype ){
            return (
                <div className="container">
                    <h1>plantType: {this.state.plant.planttype.name}</h1>
                    <p>containerType: {this.state.plant.containerType}</p>
                    <p>sunType: {this.state.plant.sunType}</p>
                    <p>lastWaterDate: {moment(this.state.plant.lastWaterDate).format( "MM/DD/YYYY HH:mm:ss" )}</p>
                    <p>nextWaterDate: {moment(this.state.plant.nextWaterDate).format( "MM/DD/YYYY HH:mm:ss" )}</p>
                    <p>lastHarvestDate: {moment(this.state.plant.lastHarvestDate).format( "MM/DD/YYYY HH:mm:ss" )}</p>
                    <p>nextHarvestDate: {moment(this.state.plant.nextHarvestDate).format( "MM/DD/YYYY HH:mm:ss" )}</p>
                    <button onClick={ this.handlePost.bind( this, "water" ) } disabled={!canWater}>Water Plant</button>
                    <button onClick={ this.handlePost.bind( this, "harvest" ) } disabled={!canHarvest}>Harvest Plant</button>
                    <button onClick={ this.deletePlant.bind( this ) }>Delete Plant</button>
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
    };

    deletePlant(){
        axios( {
            "method": "POST",
            "url": `/api/deletePlant/${this.state.plantId}`,
            "headers": {
                "authorization": sessionStorage.getItem( "jwt" )
            }
        } )
        .then(
            () => {
                this.props.history.push( `/user/${this.props.location.state.username}` );
            }
        );
    }
};

export default Plant;
