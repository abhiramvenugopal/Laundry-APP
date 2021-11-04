import './App.css';
import { BrowserRouter as Router ,Switch, Route} from "react-router-dom";
import LandingPage from "./components/Landingpage/landing-page";
import PastOrder from "./components/PastOrder/past-order";
import Summary from "./components/Summary/summary";
function App() {
  return (
    <div className="App">
      <Router>
        <div>
          <Switch>
                  <Route exact path='/'> <LandingPage/> </Route>
                  <Route exact path='/past'> <PastOrder/> </Route>  
                  <Route exact path='/summary'> <Summary/> </Route>

                  {/* <Route exact path='/post' component={Nav}/> */}
          </Switch>

        </div>
      </Router>

    </div>
  );
}

export default App;
