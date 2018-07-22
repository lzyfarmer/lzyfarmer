// Libraries
import React from "react";

class NotFound extends React.Component{
    render(){
        return (
            <div className="container absolute">
                <h1>404 PAGE NOT FOUND</h1>
                <h1>The page you requested cannot be found. Please navgiate to another page.</h1>
                <PlantFooter/>
            </div>
        );
    }
};

export default NotFound;
