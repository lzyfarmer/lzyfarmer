// Libraries
import React from "react";
import axios from "axios";

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
        this.fetchUser();
    };

    render(){
        return (
            <div className="container">
                <h1>Welcome, { this.state.username }!</h1>
                <button onClick={ this.createPlant.bind( this ) }>Create Plant</button>
            </div>
        );
    };

    createPlant(){
        this.props.history.push( "/createPlant" );
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
