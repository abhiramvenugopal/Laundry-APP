import './App.css';
import { BrowserRouter as Router ,Switch, Route} from "react-router-dom";
import LandingPage from "./components/Landingpage/landing-page";
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
                  <Route exact path='/'> <LandingPage/> </Route>
                  {/* <Route exact path='/create'>  </Route> */}
                  {/* <Route exact path='/post' component={Nav}/> */}
          </Switch>

        </div>
      </Router>

    </div>
  );
}

export default App;
