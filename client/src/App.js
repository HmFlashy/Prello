import React, { Component } from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import createHistory from "history/createBrowserHistory";
import BoardContainer from './containers/BoardContainer';

const history = createHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Link to="/login">Home</Link> <Link to="/">About</Link> <Link to="/contact">Contact</Link> <Link to="/board">Board</Link>
          <Switch>
            <Route path="/login">
            </Route>
            <Route path="/board">
                <BoardContainer />
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
