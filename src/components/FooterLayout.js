// Libraries
import React from "react";

// Components
import Footer from "components/Footer.js";

class FooterLayout extends React.Component{
    constructor( props ){
        super( props );

        this.state = {};
    };

    render(){
        return(
            <div>
                { this.props.children }
                <Footer/>
            </div>
        );
    };
};

export default FooterLayout;
