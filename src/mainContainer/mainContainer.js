import React from 'react';
import PageSelect from "../pageSelect/pageSelect";
import ReqContainer from "../reqContainer/reqContainer";
import {
    Switch,
    Route
} from "react-router-dom";
import Header from "../header/header";

const MainContainer = () => {
    return (
        <div className={{marginBottom:'30px'}}>
            <Header />
            <Switch>
                <Route exact path='/select' component={PageSelect}/>
                <Route path='/req' component={ReqContainer}/>
            </Switch>
        </div>
    );
};


export default MainContainer;