// Libraries
import React from "react";
import axios from "axios";

class Login extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "username": "",
            "password": ""
        }
    };

    render(){
        return (
            <div className="container column">
                <input placeholder="Username" value={ this.state.username } onChange={ this.changeUsername.bind( this ) }/>
                <input placeholder="Password" type="password" value={ this.state.password } onChange={ this.changePassword.bind( this ) }/>
                <button onClick={ this.login.bind( this ) }>Submit</button>
            </div>
        );
    };

    changeUsername( event ){
        this.setState( {
            "username": event.target.value
        } );
    };

    changePassword( event ){
        this.setState( {
            "password": event.target.value
        } );
    };

    login(){
        console.log( "try login" );
        axios.post(
            "/api/login",
            {
                "username": this.state.username,
                "password": this.state.password
            }
        ).then(
            ( response ) => {
                console.log( "response", response );
            }
        );
    };
};

export default Login;
