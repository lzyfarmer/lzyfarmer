// Libraries
import React from "react";

class Image extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "failed": false
        };
    };

    render(){
        if( this.state.failed ){
            return <img src="/src/images/noImage.png"/>
        }
        else{
            return <img {...this.props} onError={ this.handleImageError.bind( this ) }/>
        }
    };

    handleImageError(){
        this.setState( {
            "failed": true
        } );
    }
};

export default Image;
