// Libraries
import React from "react";
import axios from "axios";

// Helpers
import requireAuth from "helpers/requireAuth.js";
import handleApiError from "helpers/handleApiError.js";
import uppercaseFirst from "helpers/uppercaseFirst.js";

// Data
import plantData from "data/plants.json";

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
            <div className="container">
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
                var alert = canWater || canHarvest ? true : false;

                return (
                    <li key={i} onClick={this.clickPlant.bind( this, plant._id )}>
                        <h3>{uppercaseFirst(plant.planttype.name)}</h3> 
                        <p>{plantData.container[plant.containerType]}</p>,
                        <p>{plantData.sun[plant.sunType]}</p>
                        {
                            this.renderAlert( alert )
                        }
                    </li>
                );
            }
        );
    };

    renderAlert( bool ){
        if( bool ){
            return <span>!</span>;
        }

        return "";
    }

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
