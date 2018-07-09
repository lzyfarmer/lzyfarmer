// Libraries
import React from "react";

class UserHome extends React.Component{
    render(){
        var username = this.props.location.pathname.replace( "/user/", "" );

        return (
            <div className="container">
                <h1>Welcome, { username }!</h1>
            </div>
        );
    }
};

export default UserHome;
