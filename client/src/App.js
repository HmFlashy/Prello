import React, { Component } from "react";
import { Router, Route, Switch, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import createHistory from "history/createBrowserHistory";
import BoardContainer from './containers/BoardContainer/BoardContainer';
import ListBoardContainer from "./containers/BoardContainer/ListBoardContainer";
import CardDetail from "./containers/CardContainers/CardDetailContainer";
import CardDetailContainer from "./containers/CardContainers/CardDetailContainer";
import { Button } from "semantic-ui-react";
import Header from "./components/App/Header";

const history = createHistory();

class App extends Component {
  render() {
    return (
      <Router history={history}>
        <div className="App">
          <Header className="header" />
          <Link to="/login">Home</Link> <Link to="/">About</Link> <Link to="/contact">Contact</Link> <Link to="/boards">Boards</Link>
          <Switch>
            <Route exact path="/login"  />
            <Route exact path="/boards"  component={ListBoardContainer} />
            <Route exact path={["/boards/:boardId", "/boards/:boardId/card/:cardId"]}  component={BoardContainer} />
            <Route path="">
              <div>
                <CardDetailContainer key={"5bcca38415f20303bf261a19"} cardId={"5bcca38415f20303bf261a19"}></CardDetailContainer>
              </div>
            </Route>
          </Switch>
        </div>
      </Router>
    );
  }
}
export default App;
