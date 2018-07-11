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
                <input placeholder="Username" value={ this.state.username } onChange={ this.changeValue.bind( this, "username" ) }/>
                <input placeholder="Password" type="password" value={ this.state.password } onChange={ this.changeValue.bind( this, "password" ) }/>
                <button onClick={ this.login.bind( this ) }>Submit</button>
                {
                    this.renderError()
                }
            </div>
        );
    };

    renderError(){
        if( this.state.loginError ){
            return <p>Username or password incorrect. Please try again.</p>;
        }

        return "";
    };

    changeValue( type, event ){
        this.setState( {
            [type]: event.target.value,
            "loginError": false
        } );
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
                localStorage.setItem( "jwt", response.data.token );

                this.props.history.push( `/user/${response.data.user.username}` );
            }
        )
        .catch(
            ( error, response ) => {
                this.setState( {
                    "loginError": true
                } );
            }
        )
    };
};

export default Login;
