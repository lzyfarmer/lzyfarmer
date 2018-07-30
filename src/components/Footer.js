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
                        <img src="/src/images/HomeIcon.png"/>
                        <p>Plants</p>
                    </li>
                    <li onClick={ this.handleNavigate.bind( this, "/community" ) }>
                        <img src="/src/images/CommunityIcon.png"/>
                        <p>Community</p>
                    </li>
                    <li onClick={ () => { window.location = "https://amazon.com/plants"} }>
                        <img src="/src/images/ShopIcon.png"/>
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
