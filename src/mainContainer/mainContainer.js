import React from 'react';
import ReqContainerMain from "../reqContainerMain/reqContainerMain";
import Header from "../header/header";

const MainContainer = () => {
    return (
        <div className={{marginBottom:'30px'}}>
            <Header />
            <ReqContainerMain />
        </div>
    );
};


export default MainContainer;