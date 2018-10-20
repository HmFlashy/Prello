import React, { Component } from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import createHistory from "history/createBrowserHistory";
import Card from "./components/App/Card";
import BoardContainer from './containers/BoardContainer';
import ListContainer from './containers/ListContainers/ListContainer';

const history = createHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Link to="/login">Home</Link> <Link to="/">About</Link> <Link to="/contact">Contact</Link> <Link to="/board">Board</Link>
          <Switch>
            <Route path="/login">
              <Card />
            </Route>
            <Route path="/board">
                <ListContainer />
            </Route>
            <Route path="">
              <div>
                <p className="App-intro">Salut</p>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
