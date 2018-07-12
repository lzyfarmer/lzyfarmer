// Libraries
import React from "react";
import axios from "axios";

class Plant extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "plants": []
        }
    };

    componentDidMount(){
        this.fetchUserPlants();
    };

    render(){
        return (
            <div className="container column">
                <ul>
                {
                    this.state.plants.map(
                        ( plant ) => {
                            return <li>{ plant.name }</li>;
                        }
                    )
                }
                </ul>
            </div>
        );
    };

    fetchUserPlants(){
        axios.get( "https://jsonplaceholder.typicode.com/users" ).then(
            ( response ) => {
                this.setState( {
                    "plants": response.data
                } );
            }
        );
    };
};

export default Plant;
