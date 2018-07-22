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
            <div className="footer">
                <ol>
                    <li onClick={ this.handleNavigate.bind( this, `/user/${sessionStorage.getItem( "username" )}` ) }>
                        <img src="/src/images/MenuMyPlants.png"/>
                        <p>Plants</p>
                    </li>
                    <li onClick={ this.handleNavigate.bind( this, "/explore" ) }>
                        <img src="/src/images/MenuCommunity.png"/>
                        <p>Community</p>
                    </li>
                    <li onClick={ this.handleNavigate.bind( this, "/store" ) }>
                        <img src="/src/images/MenuSupplies.png"/>
                        <p>Shop</p>
                    </li>
                </ol>
            </div>
        );
    };

    handleNavigate( route ){
        this.props.history.push( route );
    };
};

export default withRouter( Footer );
