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
        var isMature;
        var daysOld;
        var firstHarvest;
        var health = canWater ? "Unhealthy" : "Healthy";
        var maturity;

        if( this.state.plant.planttype ){
            daysOld = ( moment().valueOf() - moment( this.state.plant.datePlanted ).valueOf() ) / 86400000;
            firstHarvest = moment( this.state.plant.planttype.harvestAge ).valueOf() / 86400000;
            isMature = ( moment().valueOf() - moment( this.state.plant.datePlanted ).valueOf() ) >= this.state.plant.planttype.matureCutoff;
            maturity = isMature ? "Mature Plant" : "Young Plant";

            return (
                <div className="container plant">
                    <div className="container column center wide">
                        <h1>{uppercaseFirst(this.state.plant.planttype.name)}</h1>
                        <p className="black">{this.state.plant.planttype.latinName}</p>
                        <p className="small black">Planted on {moment(this.state.plant.datePlanted).format( "MM/DD/YYYY" )}</p>
                    </div>
                    <div className="container row wide image">
                        <div className="text">
                            <h1 className="green">{ Math.floor( daysOld ) }</h1>
                            <p className="green">days old</p>
                        </div>
                        <div className="img-container">
                            <img src={ `/src/images/${this.state.plant.planttype.name}Photo.png` }/>
                        </div>
                        <div className="text">
                            <p className="green">Harvest at</p>
                            <h1 className="green">{ Math.floor( firstHarvest ) }</h1>
                            <p className="green">days</p>
                        </div>
                    </div>
                    <div className="container column center wide">
                        <h3>{ health }</h3>
                        <h3>{ maturity }</h3>
                    </div>
                    <div className="container row wide">
                        <div className="container column center wide">
                            <button className="water" onClick={ this.handlePost.bind( this, "water" ) } disabled={!canWater}>
                                <p className="white">Water Plant</p>
                                <p className="white small">Last Watered: {moment(this.state.plant.lastWaterDate).format( "MM/DD/YYYY" )}</p>
                            </button>
                        </div>
                        <div className="container column center wide">
                            <button onClick={ this.handlePost.bind( this, "harvest" ) } disabled={!canHarvest}>
                                <p className="white">Harvest Plant</p>
                                <p className="white small">Last Harvested: {moment(this.state.plant.lastHarvestDate).format( "MM/DD/YYYY" )}</p>
                            </button>
                        </div>
                    </div>
                    <div className="container row wide">
                        <div className="container column center wide">
                            <button onClick={ this.handlePost.bind( this, "nutrients" ) }>
                                <p className="white">Nutrients</p>
                            </button>
                        </div>
                        <div className="container column center wide">
                            <button onClick={ this.handlePost.bind( this, "maintenance" ) }>
                                <p className="white">Maintenance</p>
                            </button>
                        </div>
                    </div>
                    <p className="delete" onClick={ this.deletePlant.bind( this ) }>Delete Plant</p>
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
        if( window.confirm( "Are you sure you want to proceed with this action?" ) ){
            axios( {
                "method": "POST",
                "url": `/api/${type}Plant/${this.state.plantId}`,
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
