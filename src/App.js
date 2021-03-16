import TableData from "./tableData/tableData";
import Header from "./header/header";
import ControlData from "./controlData/controlData";

function App() {
  return (
    <div className="App">
      <header>
              <Header />
              <ControlData />
              <TableData />
      </header>
    </div>
  );
}

export default App;
