import './App.css';
import React from 'react';
import { BrowserRouter as Router ,Switch, Route} from "react-router-dom";
import LandingPage from "./components/Landingpage/landing-page";
import Nav from "./components/Nav/nav"
import Footer from './components/Footer/footer';
import Register from './components/Register/register';
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
                <Route exact path='/'><Nav/><LandingPage/><Footer/></Route>
                <Route exact path='/Register'><Nav/><Register/><Footer/></Route>
          </Switch>
        </div>
      </Router>

    </div>
  );
}

export default App;
