// Libraries
import React from "react";
import { withRouter } from "react-router";

class Header extends React.Component{
    constructor( props ){
        super( props );

        this.state = {};
    };

    render(){
        return(
            <div className="header container row">
                <img src="/src/images/LZYlogo.png" onClick={ this.handleNavigate.bind( this, `/user/${sessionStorage.getItem( "username" )}` ) }/>
                <p onClick={ this.clickLogout.bind( this ) }>Logout</p>
            </div>
        );
    };

    handleNavigate( route ){
        this.props.history.push( route );
    };

    clickLogout(){
        sessionStorage.removeItem( "jwt" )

        this.props.history.push( "/" );
    };
};

export default withRouter( Header );
