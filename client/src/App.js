import React, { Component } from "react";
import { Route, Switch, Link } from "react-router-dom";
import "./App.css";
import BoardContainer from './containers/BoardContainer/BoardContainer';
import ListBoardContainer from "./containers/BoardContainer/ListBoardContainer";
import Header from "./components/App/Header";
import { ConnectedRouter } from 'connected-react-router'
import { history } from './history'

import { Provider } from 'react-redux'
import configureStore from './redux/store'

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <ConnectedRouter history={history}>
          <div className="App">
            <Header className="header" />
            <Link to="/login">Home</Link> <Link to="/">About</Link> <Link to="/contact">Contact</Link> <Link to="/boards">Boards</Link>
            <Switch>
              <Route exact path="/login" />
              <Route exact path="/boards" component={ListBoardContainer} />
              <Route exact path="/boards/:boardId" component={BoardContainer} />
              <Route exact path="/card/:cardId" component={BoardContainer} />
              <Route path="">
                <div>
                  <p className="App-intro">Salut</p>
                </div>
              </Route>
            </Switch>
          </div>
        </ConnectedRouter>
      </Provider>
    );
  }
}
export default App;
