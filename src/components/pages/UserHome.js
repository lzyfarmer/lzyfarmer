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
            "user": {}
        }
    };

    componentWillMount(){
        requireAuth( this.props );
    };

    render(){
        return (
            <div className="container column">
                <h1>Welcome, { this.state.username }!</h1>
                <button onClick={ this.createPlant.bind( this ) }>Create Plant</button>
                <button onClick={ this.logout.bind( this ) }>Logout</button>
            </div>
        );
    };

    createPlant(){
        this.props.history.push( "/createPlant" );
    };

    logout(){
        localStorage.removeItem( "jwt" )
    };

    fetchUser(){
        axios( {
            "method": "GET",
            "url": `/api/user/${this.state.username}`,
            "data": {
                "username": this.state.username
            },
            "headers": {
                "authorization": localStorage.getItem( "jwt" )
            }
        } )
        .then(
            ( response ) => {
                console.log( "fetchUser:response", response );
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
