import './App.css';
import React from 'react';
import { BrowserRouter as Router ,Switch, Route} from "react-router-dom";
import LandingPage from "./components/Landingpage/landing-page";
import Nav from "./components/Nav/nav"
import Footer from './components/Footer/footer';
import Register from './components/Register/register';
import PastOrder from "./components/PastOrder/past-order";
import Summary from "./components/Summary/summary";
import CreatePage from "./components/CreateOrder/create-order"
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
                  <Route exact path='/'><Nav/><LandingPage/><Footer/></Route>
                  <Route exact path='/Register'><Nav/><Register/><Footer/></Route>
                  <Route exact path='/past'> <PastOrder/> </Route>  
                  <Route exact path='/summary'> <Summary/> </Route>

                  <Route exact path='/create'><Nav/><CreatePage/></Route>
                  {/* <Route exact path='/post' component={Nav}/> */}
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
