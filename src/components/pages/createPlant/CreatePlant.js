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
                "plantType": "tomato",
                "containerType": "1",
                "sunType": "1"
            }
        }
    };

    render(){
        return (
            <div className="container column">
                {
                    this.renderPage()
                }
                {
                    this.renderButtons()
                }
            </div>
        );
    };

    renderPage(){
        switch( this.state.step ){
            case 1:
                return <Upsell
                    handleNavigate={ this.handleNavigate.bind( this ) }
                />;

            case 2:
                return <PlantType
                    formValues={ this.state.formValues }
                    updateFormValues={ this.updateFormValues.bind( this ) }
                />;

            case 3:
                return <ContainerType
                    formValues={ this.state.formValues }
                    updateFormValues={ this.updateFormValues.bind( this ) }
                />;

            case 4:
                return <SunType
                    formValues={ this.state.formValues }
                    updateFormValues={ this.updateFormValues.bind( this ) }
                />;

            case 5:
                return <Confirmation
                    formValues={ this.state.formValues }
                    savePlant={ this.savePlant.bind( this ) }
                />;
        }
    };

    renderButtons(){
        if( this.state.step == 1 ){
            return (
                <div>
                    <button onClick={ this.nextStep.bind( this ) }>Next</button>
                    <button>Cancel</button>
                </div>
            );
        }
        if( this.state.step == 5 ){
            return (
                <div>
                    <button onClick={ this.previousStep.bind( this ) }>Previous</button>
                    <button>Cancel</button>
                </div>
            );
        }
        else{
            return (
                <div>
                    <button onClick={ this.previousStep.bind( this ) }>Previous</button>
                    <button onClick={ this.nextStep.bind( this ) }>Next</button>
                    <button>Cancel</button>
                </div>
            );
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
        axios( {
            "method": "POST",
            "url": `/api/plants/${this.props.location.state.username}`,
            "data": {
                "form": this.state.formValues
            },
            "headers": {
                "authorization": sessionStorage.getItem( "jwt" )
            }
        } )
        .then(
            ( response ) => {
                this.props.history.push( `/user/${response.data.username}` );
            }
        );
    };
};

export default Plant;
