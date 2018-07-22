// Libraries
import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import FooterLayout from "components/FooterLayout.js";
import Login from "components/pages/Login.js";
import Signup from "components/pages/Signup.js";
import Store from "components/pages/Store.js";
import Plant from "components/pages/Plant.js";
import Explore from "components/pages/Explore.js";
import UserHome from "components/pages/UserHome.js";
import CreatePlant from "components/pages/createPlant/CreatePlant.js";
import NotFound from "components/pages/NotFound.js";

const Main = () => (
    <Switch>
        <Route exact path="/" component={ Login }/>
        <Route path="/signup" component={ Signup }/>
        <FooterLayout>
            <Route path="/plant/:id" component={ Plant }/>
            <Route path="/user/:id" component={ UserHome }/>
            <Route path="/createPlant" component={ CreatePlant }/>
            <Route path="/store" component={ Store }/>
            <Route path="/explore" component={ Explore }/>
        </FooterLayout>
        <Route path="*" component={ NotFound }/>
    </Switch>
);

export default Main;
