// Libraries
import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import Login from "components/pages/Login.js";
import Signup from "components/pages/Signup.js";
import Plant from "components/pages/Plant.js";
import Explore from "components/pages/Explore.js";
import UserHome from "components/pages/UserHome.js";
import NotFound from "components/pages/NotFound.js";

const Main = () => (
    <div className="appBody">
        <Switch>
            <Route exact path="/" component={ Login }/>
            <Route path="/signup" component={ Signup }/>
            <Route path="/plant/:id" component={ Plant }/>
            <Route path="/user/:id" component={ UserHome }/>
            <Route path="/explore" component={ Explore }/>
            <Route path="*" component={ NotFound }/>
        </Switch>
    </div>
);

export default Main;
