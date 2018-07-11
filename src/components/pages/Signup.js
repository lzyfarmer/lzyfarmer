// Libraries
import React from "react";
import axios from "axios";

class Signup extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "username": "",
            "password": "",
            "zipcode": "",
            "userExistsError": false
        }
    };

    render(){
        return (
            <div className="container column">
                <input placeholder="Username" value={ this.state.username } onChange={ this.changeValue.bind( this, "username" ) }/>
                <input placeholder="Zipcode" value={ this.state.zipcode } onChange={ this.changeValue.bind( this, "zipcode" ) }/>
                <input placeholder="Password" type="password" value={ this.state.password } onChange={ this.changeValue.bind( this, "password" ) }/>
                {
                    this.renderSubmitButton()
                }
                {
                    this.renderUserExistsError()
                }
            </div>
        );
    };

    renderSubmitButton(){
        if(
            this.state.username &&
            this.state.zipcode &&
            this.state.password &&
            this.state.password.length > 6
        ){
            return <button onClick={ this.signup.bind( this ) }>Sign Up</button>;
        }

        return <button disabled="true" onClick={ this.signup.bind( this ) }>Sign Up</button>
    };

    renderUserExistsError(){
        if( this.state.userExistsError ){
            return <p>Username taken. Please try again.</p>;
        }

        return "";
    };

    changeValue( type, event ){
        this.setState( {
            "userExistsError": false
        } );
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
                "zipcode": this.state.zipcode
            }
        )
        .then(
            ( response ) => {
                localStorage.setItem( "jwt", response.data.token );

                this.props.history.push( `/user/${response.data.user.username}` );
            }
        ).
        catch(
            ( error ) => {
                if( error.response.status == 409 ){
                    this.setState( {
                        "userExistsError": true
                    } );
                }
            }
        );
    };
};

export default Signup;
