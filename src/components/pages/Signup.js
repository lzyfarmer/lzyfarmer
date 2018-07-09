// Libraries
import React from "react";
import axios from "axios";

class Signup extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "username": "",
            "password": "",
            "lastName": "",
            "firstName": "",
            "zipcode": ""
        }
    };

    render(){
        return (
            <div className="container column">
                <input placeholder="First Name" value={ this.state.firstName } onChange={ this.changeValue.bind( this, "firstName" ) }/>
                <input placeholder="Last Name" value={ this.state.lastName } onChange={ this.changeValue.bind( this, "lastName" ) }/>
                <input placeholder="Username" value={ this.state.username } onChange={ this.changeValue.bind( this, "username" ) }/>
                <input placeholder="Zipcode" value={ this.state.zipcode } onChange={ this.changeValue.bind( this, "zipcode" ) }/>
                <input placeholder="Password" type="password" value={ this.state.password } onChange={ this.changeValue.bind( this, "password" ) }/>
                <button onClick={ this.signup.bind( this ) }>Sign Up</button>
            </div>
        );
    };

    changeValue( type, event ){
        this.setState( {
            [type]: event.target.value
        } );
    };

    signup(){
        axios.post(
            "/api/signup",
            {
                "username": this.state.username,
                "password": this.state.password,
                "firstName": this.state.firstName,
                "lastName": this.state.lastName,
                "zipcode": this.state.zipcode,
            }
        )
        .then(
            ( response ) => {
                // localStorage.setItem( "jwt", response.data.token );

                this.props.history.push( `/user/${response.data.user.username}` );
            }
        )
        .catch(
            ( error, response ) => {
                console.log( "error signup", error );
            }
        )
    };
};

export default Signup;
