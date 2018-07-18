// Libraries
import React from "react";
import { withRouter } from "react-router";

class Footer extends React.Component{
    constructor( props ){
        super( props );

        this.state = {};
    };

    render(){
        return(
            <div className="footer container row">
                <button>Home</button>
                <button onClick={ this.handleNavigate.bind( this, "/explore" ) }>Explore</button>
                <button onClick={ this.handleNavigate.bind( this, "/store" ) }>Store</button>
                <button onClick={ this.clickLogout.bind( this ) }>Logout</button>
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

export default withRouter( Footer );
