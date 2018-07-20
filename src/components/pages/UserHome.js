// Libraries
import React from "react";
import axios from "axios";

// Helpers
import requireAuth from "helpers/requireAuth.js";
import handleApiError from "helpers/handleApiError.js";

class UserHome extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "username": this.props.location.pathname.replace( "/user/", "" ),
            "user": {},
            "plants": []
        }
    };

    componentWillMount(){
        requireAuth( this.props );
    };

    componentDidMount(){
        this.fetchPlants();
    };

    render(){
        return (
            <div className="container column">
                <h1>Welcome, { this.state.username }!</h1>
                <button onClick={ this.createPlant.bind( this ) }>Create Plant</button>
                <ol>
                    {
                        this.renderPlants()
                    }
                </ol>
            </div>
        );
    };

    renderPlants(){
        var plants = this.state.plants;

        return plants.map(
            ( plant, i ) => {
                var nextWaterDate = new Date( plant.nextWaterDate );
                var nextHarvestDate = new Date( plant.nextHarvestDate );
                var now = new Date();
                var canWater = nextWaterDate <= now;
                var canHarvest = nextHarvestDate <= now;
                var alertClass = canWater || canHarvest ? "alert" : "";

                return (
                    <li key={i} className={ alertClass } onClick={this.clickPlant.bind( this, plant._id )}>
                        <p>plantType: {plant.planttype.name}</p>
                        <p>sunType: {plant.containerType}</p>
                        <p>containerType: {plant.sunType}</p>
                    </li>
                );
            }
        );
    };

    clickPlant( plantId ){
        this.props.history.push( {
            "pathname": `/plant/${plantId}`,
            "state": {
                "username": this.state.username
            }
        } );
    };

    createPlant(){
        this.props.history.push( {
            "pathname": "/createPlant",
            "state": {
                "username": this.state.username
            }
        } );
    };

    logout(){
        sessionStorage.removeItem( "jwt" )

        this.props.history.push( "/" );
    };

    fetchPlants(){
        axios( {
            "method": "GET",
            "url": `/api/${this.state.username}/plants`,
            "data": {
                "username": this.state.username
            },
            "headers": {
                "authorization": sessionStorage.getItem( "jwt" )
            }
        } )
        .then(
            ( response ) => {
                this.setState( {
                    "plants": response.data
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

export default UserHome;
