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
                "sunType": ""
            }
        }
    };

    render(){
        switch( this.state.step ){
            case 1:
                return <Upsell
                    nextStep={ this.nextStep.bind( this ) }
                    handleNavigate={ this.handleNavigate.bind( this ) }
                />;

            case 2:
                return <PlantType
                    formValues={ this.state.formValues }
                    nextStep={ this.nextStep.bind( this ) }
                    previousStep={ this.previousStep.bind( this ) }
                    updateFormValues={ this.updateFormValues.bind( this ) }
                />;

            case 3:
                return <ContainerType
                    formValues={ this.state.formValues }
                    nextStep={ this.nextStep.bind( this ) }
                    previousStep={ this.previousStep.bind( this ) }
                    updateFormValues={ this.updateFormValues.bind( this ) }
                />;

            case 4:
                return <SunType
                    formValues={ this.state.formValues }
                    nextStep={ this.nextStep.bind( this ) }
                    previousStep={ this.previousStep.bind( this ) }
                    updateFormValues={ this.updateFormValues.bind( this ) }
                />;

            case 5:
                return <Confirmation
                    formValues={ this.state.formValues }
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

    updateFormValues( values ){
        var updatedForm = Object.assign( {}, this.state.formValues, values );

        this.setState( {
            "formValues": updatedForm
        } )
    };

    handleNavigate( route ){
        this.props.history.push( route );
    };

    savePlant(){
        console.log( "savePlant:formValues", this.state.formValues );

        axios( {
            "method": "POST",
            "url": `/api/plants/${this.props.location.state.username}`,
            "data": {
                "form": this.state.formValues
            },
            "headers": {
                "authorization": localStorage.getItem( "jwt" )
            }
        } ).then(
            ( response ) => {
                console.log( "savePlant:response", response );
                this.props.history.push( `/user/${response.data.username}` );
            }
        );
    };
};

export default Plant;
