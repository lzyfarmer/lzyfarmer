// Libraries
import React from "react";
import axios from "axios";

module.exports = function requireAuth( props ){
    axios( {
        "method": "GET",
        "url": `/api/checkAuth`,
        "headers": {
            "authorization": sessionStorage.getItem( "jwt" )
        }
    } )
    .catch(
        () => {
            props.history.push( "/" );
        }
    );
}
