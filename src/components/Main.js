// Libraries
import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import Login from "components/pages/Login.js";
import Signup from "components/pages/Signup.js";
import Store from "components/pages/Store.js";
import Plant from "components/pages/Plant.js";
import Explore from "components/pages/Explore.js";
import UserHome from "components/pages/UserHome.js";
import CreatePlant from "components/pages/createPlant/CreatePlant.js";
import NotFound from "components/pages/NotFound.js";

const Main = () => (
    <div className="appBody">
        <Switch>
            <Route exact path="/" component={ Login }/>
            <Route path="/signup" component={ Signup }/>
            <Route path="/store" component={ Store }/>
            <Route path="/plant/:id" component={ Plant }/>
            <Route path="/user/:id" component={ UserHome }/>
            <Route path="/createPlant" component={ CreatePlant }/>
            <Route path="/explore" component={ Explore }/>
            <Route path="*" component={ NotFound }/>
        </Switch>
    </div>
);

export default Main;
