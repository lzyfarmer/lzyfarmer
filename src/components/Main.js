// Libraries
import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import AuthenticatedLayout from "components/AuthenticatedLayout.js";
import Login from "components/pages/Login.js";
import Signup from "components/pages/Signup.js";
import Store from "components/pages/Store.js";
import Plant from "components/pages/Plant.js";
import Community from "components/pages/Community.js";
import UserHome from "components/pages/UserHome.js";
import CreatePlant from "components/pages/createPlant/CreatePlant.js";
import NotFound from "components/pages/NotFound.js";

const Main = () => (
    <Switch>
        <Route exact path="/" component={ Login }/>
        <Route path="/signup" component={ Signup }/>
        <AuthenticatedLayout>
            <Route path="/plant/:id" component={ Plant }/>
            <Route path="/user/:id" component={ UserHome }/>
            <Route path="/createPlant" component={ CreatePlant }/>
            <Route path="/store" component={ Store }/>
            <Route path="/community" component={ Community }/>
        </AuthenticatedLayout>
        <Route path="*" component={ NotFound }/>
    </Switch>
);

export default Main;
