// Libraries
import React from "react";
import { Switch, Route } from "react-router-dom";

// Components
import Home from "components/pages/Home.js";
import Login from "components/pages/Login.js";
import Plant from "components/pages/Plant.js";
import Explore from "components/pages/Explore.js";
import NotFound from "components/pages/NotFound.js";

const Main = () => (
    <div className="appBody">
        <Switch>
            <Route exact path="/" component={ Home }/>
            <Route path="/login" component={ Login }/>
            <Route path="/plant/:id" component={ Plant }/>
            <Route path="/explore" component={ Explore }/>
            <Route path="*" component={ NotFound }/>
        </Switch>
    </div>
);

export default Main;
