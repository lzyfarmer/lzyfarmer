// Libraries
import React from "react";
import axios from "axios";

// Components
import Upsell from "./Upsell.js";
import PlantType from "./PlantType.js";
import ContainerType from "./ContainerType.js";
import SunType from "./SunType.js";
import Confirmation from "./Confirmation.js";

class Plant extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "step": 1,
            "formValues": {
                "plantType": "",
                "containerType": "",
                "sunType": "",
            }
        }
    };

    render(){
        switch( this.state.step ){
            case 1:
                return <Upsell
                    nextStep={ this.nextStep.bind( this ) }
                />;

            case 2:
                return <PlantType
                    nextStep={ this.nextStep.bind( this ) }
                    previousStep={ this.previousStep.bind( this ) }
                />;

            case 3:
                return <ContainerType
                    nextStep={ this.nextStep.bind( this ) }
                    previousStep={ this.previousStep.bind( this ) }
                />;

            case 4:
                return <SunType
                    nextStep={ this.nextStep.bind( this ) }
                    previousStep={ this.previousStep.bind( this ) }
                />;

            case 5:
                return <Confirmation
                    savePlant={ this.savePlant.bind( this ) }
                    previousStep={ this.previousStep.bind( this ) }
                />;
        }
    };

    nextStep(){
        this.setState( {
            "step": this.state.step + 1
        } );
    };

    previousStep(){
        this.setState( {
            "step": this.state.step - 1
        } );
    };

    savePlant(){
        console.log( "savePlant:formValues", this.state.formValues );
        // axios.get( "https://jsonplaceholder.typicode.com/users" ).then(
        //     ( response ) => {
        //         this.setState( {
        //             "plants": response.data
        //         } );
        //     }
        // );
    };
};

export default Plant;
