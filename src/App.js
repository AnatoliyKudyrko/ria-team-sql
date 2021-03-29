import React from "react";
import Dashboard from "./Dashboard/Dashboard";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";
import SignIn from "./auth/SingIn/SingIn";
import SignUpUser from "./auth/SignUp/SignUpUser";
import Forgot from "./auth/Forgot/Forgot";
import Admin from "./Admin/Admin";


 const App= () => {
  return (
        <div className="App">
            <Router>
            <Switch>
                <Route exact path='/' component={SignIn}/>
                <Route path="/dashboard" component={Dashboard} />
                <Route path='/singUp' component={SignUpUser} />
                <Route path='/forgot' component={Forgot} />
                <Route path='/admin' component={Admin} />
            </Switch>
                </Router>
        </div>
  );
}
export default App;


