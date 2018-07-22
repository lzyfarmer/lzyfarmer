// Libraries
import React from "react";
import axios from "axios";

// Components
import PlantFooter from "components/elements/PlantFooter.js";

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
            <div>
                <div className="container absolute">
                    <img src="/src/images/LZYlogo.png" />
                    <input placeholder="Username" value={ this.state.username } onChange={ this.changeValue.bind( this, "username" ) }/>
                    <input placeholder="Password" type="password" value={ this.state.password } onChange={ this.changeValue.bind( this, "password" ) }/>
                    {
                        this.renderError()
                    }
                    <button onClick={ this.login.bind( this ) }>Login</button>
                    <button onClick={ this.signup.bind( this ) }>Sign Up</button>
                </div>
                <PlantFooter/>
            </div>
        );
    };

    renderError(){
        if( this.state.loginError ){
            return <p className="error">Username or password incorrect. Please try again.</p>;
        }

        return "";
    };

    changeValue( type, event ){
        this.setState( {
            [type]: event.target.value,
            "loginError": false
        } );
    };

    signup(){
        this.props.history.push( "signup" );
    };

    login(){
        axios.post(
            "/api/login",
            {
                "username": this.state.username,
                "password": this.state.password
            }
        )
        .then(
            ( response ) => {
                sessionStorage.setItem( "jwt", response.data.token );

                this.props.history.push( `/user/${response.data.user.username}` );
            }
        )
        .catch(
            ( error ) => {
                this.setState( {
                    "loginError": true
                } );
            }
        )
    };
};

export default Login;
