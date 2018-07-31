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
            <div className="plants container">
                {
                    this.renderPlants()
                }
                <button className="light" onClick={ this.createPlant.bind( this ) }>Create Plant</button>
            </div>
        );
    };

    renderPlants(){
        var plants = this.state.plants;

        if( plants.length ){
            return (
                <ol>
                    {
                        plants.map(
                            ( plant, i ) => {
                                var nextWaterDate = new Date( plant.nextWaterDate );
                                var nextHarvestDate = new Date( plant.nextHarvestDate );
                                var now = new Date();
                                var canWater = nextWaterDate <= now;
                                var canHarvest = nextHarvestDate <= now;
                                var alert = canWater ? true : false;

                                return (
                                    <li key={i} onClick={this.clickPlant.bind( this, plant._id )}>
                                        <h1>{uppercaseFirst(plant.planttype.name)}</h1>
                                        <p>{plantData.growMedium[plant.growMedium]}</p>,
                                        <p>{plantData.sun[plant.sunType]}</p>
                                        {
                                            this.renderAlert( alert )
                                        }
                                    </li>
                                );
                            }
                        )
                    }
                </ol>
            );
        }

        return <p className="green">No plants found. Please create a plant.</p>;
    };

    renderAlert( bool ){
        if( bool ){
            return <span>!</span>;
        }

        return "";
    }

    clickPlant( plantId ){
        this.props.history.push( {
            "pathname": `/plant/${plantId}`
        } );
    };

    createPlant(){
        this.props.history.push( {
            "pathname": "/createPlant"
        } );
    };

    logout(){
        sessionStorage.removeItem( "jwt" )

        this.props.history.push( "/" );
    };

    fetchPlants(){
        axios( {
            "method": "GET",
            "url": `/api/${sessionStorage.getItem( "username" )}/plants`,
            "data": {
                "username": sessionStorage.getItem( "username" )
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
