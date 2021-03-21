import React from 'react';
import ReqContainerMain from "../reqContainerMain/reqContainerMain";
import {
    Switch,
    Route
} from "react-router-dom";
import Header from "../header/header";
import AnalyticMain from "../analyticContainer/analyticMain/analyticMain";

const MainContainer = () => {
    return (
        <div className={{marginBottom:'30px'}}>
            <Header />
            <Switch>
                <Route path='/req' component={ReqContainerMain}/>
                <Route path='/analytic' component={AnalyticMain}/>
            </Switch>
        </div>
    );
};


export default MainContainer;