// Libraries
import React from "react";
import axios from "axios";

// Components
import Upsell from "./Upsell.js";
import PlantType from "./PlantType.js";
import PlantAge from "./PlantAge.js";
import SoilType from "./SoilType.js";
import Location from "./Location.js";
import SunType from "./SunType.js";
import Confirmation from "./Confirmation.js";
import Setting from "./Setting.js";
import ContainerSize from "./ContainerSize.js";
import SunTiming from "./SunTiming.js";
import Name from "./Name.js";

class Plant extends React.Component{
    constructor( props ){
        super( props );

        this.state = {
            "step": 1,
            "formValues": {
                "plantType": "tomato",
                "plantAge": "1",
                "soilType": "1",
                "location": "1",
                "sunType": "1",
                "setting": "1",
                "containerSize": "0",
                "sunTiming": "1",
                "name": ""
            }
        }
    };

    render(){
        return (
            <div className="container absolute">
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
                return <Name
                    formValues={ this.state.formValues }
                    updateFormValues={ this.updateFormValues.bind( this ) }
                />;

            case 4:
                return <PlantAge
                    formValues={ this.state.formValues }
                    updateFormValues={ this.updateFormValues.bind( this ) }
                />;

            case 5:
                return <SunType
                    formValues={ this.state.formValues }
                    updateFormValues={ this.updateFormValues.bind( this ) }
                />;

            case 6:
                return <SoilType
                    formValues={ this.state.formValues }
                    updateFormValues={ this.updateFormValues.bind( this ) }
                />;

            case 7:
                return <Location
                    formValues={ this.state.formValues }
                    updateFormValues={ this.updateFormValues.bind( this ) }
                />;

            case 8:
                return <Setting
                    formValues={ this.state.formValues }
                    updateFormValues={ this.updateFormValues.bind( this ) }
                />;

            case 9:
                return <ContainerSize
                    formValues={ this.state.formValues }
                    updateFormValues={ this.updateFormValues.bind( this ) }
                />;

            case 10:
                return <SunTiming
                    formValues={ this.state.formValues }
                    updateFormValues={ this.updateFormValues.bind( this ) }
                />;

            case 11:
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
                    <span className="next" onClick={ this.nextStep.bind( this ) }>&#8250;</span>
                </div>
            );
        }
        if( this.state.step == 11 ){
            return (
                <div>
                    <span className="previous" onClick={ this.previousStep.bind( this ) }>&#8249;</span>
                </div>
            );
        }
        else{
            return (
                <div>
                    <span className="previous" onClick={ this.previousStep.bind( this ) }>&#8249;</span>
                    <span className="next" onClick={ this.nextStep.bind( this ) }>&#8250;</span>
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
            "url": `/api/plants/${sessionStorage.getItem( "username" )}`,
            "data": {
                "form": this.state.formValues
            },
            "headers": {
                "authorization": sessionStorage.getItem( "jwt" )
            }
        } )
        .then(
            ( response ) => {
                this.props.history.push( `/user/${sessionStorage.getItem( "username" )}` );
            }
        );
    };
};

export default Plant;
