import './App.css';
import React from 'react';
import { BrowserRouter as Router ,Switch, Route} from "react-router-dom";
import LandingPage from "./components/Landingpage/landing-page";
import CreatePage from "./components/CreateOrder/create-order"
import PrivateRoute from './private-route/private-route';
 
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
                  <PrivateRoute exact path='/create' component={CreatePage}/>
                  <Route exact path='/'><LandingPage/>{window.localStorage.clear()}</Route>
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
