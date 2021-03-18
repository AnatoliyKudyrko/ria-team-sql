import Header from "./header/header";
import ControlTabs from "./controlTabs/controlTabs";
import {SelectViewContainer} from "./SelectViewContainer/SelectViewContainer";



 const App= () => {
  return (
        <div className="App">
           <Header />
           <ControlTabs />
           <SelectViewContainer />

        </div>
  );
}

export default App;
