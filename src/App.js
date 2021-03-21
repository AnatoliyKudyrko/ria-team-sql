import React from "react";
import MainContainer from "./mainContainer/mainContainer";
import {BrowserRouter} from "react-router-dom";




 const App= () => {
  return (
      <BrowserRouter>
        <div className="App">
          <MainContainer />
        </div>
      </BrowserRouter>
  );
}
export default App;


