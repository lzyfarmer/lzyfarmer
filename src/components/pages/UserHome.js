// Libraries
import React from "react";
import axios from "axios";

// Helpers
import requireAuth from "helpers/requireAuth.js";

// Helpers
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
                <ol className="plants">
                    {
                        this.renderPlants()
                    }
                </ol>
                <button onClick={ this.createPlant.bind( this ) }>Create Plant</button>
                <button onClick={ this.logout.bind( this ) }>Logout</button>
            </div>
        );
    };

    renderPlants(){
        var plants = this.state.plants;

        return plants.map(
            ( plant, i ) => (
                <li key={i} onClick={this.clickPlant.bind( this, plant._id )}>
                    <p>plantType: {plant.planttype.name}</p>
                    <p>sunType: {plant.containerType}</p>
                    <p>containerType: {plant.containerType}</p>
                </li>
            )
        );
    };

    clickPlant( plantId ){
        console.log( "plantId", plantId );
        this.props.history.push( `/plant/${plantId}` );
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
        localStorage.removeItem( "jwt" )

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
                "authorization": localStorage.getItem( "jwt" )
            }
        } )
        .then(
            ( response ) => {
                console.log( "fetchPlants:response", response );
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
