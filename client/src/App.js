import React, { Component } from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import createHistory from "history/createBrowserHistory";
import BoardContainer from './containers/BoardContainer/BoardContainer';
import ListBoardContainer from "./containers/BoardContainer/ListBoardContainer";

const history = createHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Link to="/login">Home</Link> <Link to="/">About</Link> <Link to="/contact">Contact</Link> <Link to="/boards">Boards</Link> <Link to="/boards/board1">Board</Link>
          <Switch>
            <Route exact path="/login"  />
              <Route exact path="/boards"  component={ListBoardContainer} />
            <Route exact path="/boards/:boardId" component={BoardContainer} />
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
