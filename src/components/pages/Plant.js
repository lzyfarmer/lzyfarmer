// Libraries
import React from "react";
import axios from "axios";
import moment from "moment";

// Helpers
import handleApiError from "helpers/handleApiError.js";
import uppercaseFirst from "helpers/uppercaseFirst.js";

// Data
import plantData from "data/plants.json";

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
                <div className="container plant">
                    <div className="container column center wide">
                        <h1>{uppercaseFirst(this.state.plant.planttype.name)}</h1>
                        <p>Nomen Latine</p>
                        <p className="small">Planted on {moment(this.state.plant.datePlanted).format( "MM/DD/YYYY hh:mm:ss" )}</p>
                    </div>
                    <div className="container row wide image">
                        <div className="text">
                            <h3 className="green">15</h3>
                            <p className="green">days old</p>
                        </div>
                        <div className="img-container">
                            <img src={ `/src/images/${this.state.plant.planttype.name}Photo.png` }/>
                        </div>
                        <div className="text">
                            <h3 className="green">15</h3>
                            <p className="green">days until harvest</p>
                        </div>
                    </div>
                    <div className="container row wide">
                        <div className="container column center wide">
                            <p><span className="green">Medium:</span> {plantData.growMedium[this.state.plant.growMedium]}</p>
                            <button className="water" onClick={ this.handlePost.bind( this, "water" ) } disabled={!canWater}>Water Plant</button>
                            <p className="small">Last Watered: {moment(this.state.plant.lastWaterDate).format( "MM/DD/YYYY" )}</p>
                        </div>
                        <div className="container column center wide">
                            <p><span className="green">Sun:</span> {plantData.sun[this.state.plant.sunType]}</p>
                            <button onClick={ this.handlePost.bind( this, "harvest" ) } disabled={!canHarvest}>Harvest Plant</button>
                            <p className="small">Last Harvested: {moment(this.state.plant.lastHarvestDate).format( "MM/DD/YYYY" )}</p>
                        </div>
                    </div>
                    <button className="error" onClick={ this.deletePlant.bind( this ) }>Delete Plant</button>
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
        if( window.confirm( "Are you sure you want to water/harvest?" ) ){
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

    deletePlant(){
        if( window.confirm( "Are you sure you want to delete this plant?" ) ){
            axios( {
                "method": "POST",
                "url": `/api/deletePlant/${this.state.plantId}`,
                "headers": {
                    "authorization": sessionStorage.getItem( "jwt" )
                }
            } )
            .then(
                () => {
                    this.props.history.push( `/user/${sessionStorage.getItem( "username" )}` );
                }
            );
        }
    }
};

export default Plant;
