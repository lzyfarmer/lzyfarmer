// Libraries
import React from "react";

class Footer extends React.Component{
    constructor( props ){
        super( props );

        this.state = {};
    };

    render(){
        console.log( "FOOTER props.location", this.props.location );

        return(
            <div>
                FOOTER
            </div>
        );
    };
};

export default Footer;
