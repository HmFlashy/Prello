import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import AuthentificationPage from './pages/AuthentificationPage'
import BoardPage from './pages/BoardPage'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './history'
import HomePage from './pages/HomePage'

import { Provider } from 'react-redux'
import configureStore from './redux/store'

class App extends Component {
  render() {
    return (
      <Provider store={configureStore()}>
        <ConnectedRouter history={history}>
          <div className="App">
            <div className="app-content">
              <Switch>
                    <Route exact path="/login"            component={AuthentificationPage} />
                    <Route exact path="/register"         component={AuthentificationPage} />
                    <Route exact path="/home"             component={HomePage} />
                    <Route exact path="/boards/:boardId"  component={BoardPage} />
                    <Route exact path="/card/:cardId"     component={BoardPage} />
                    <Redirect to="/login"/>
              </Switch>
            </div>
          </div>
        </ConnectedRouter >
      </Provider >
    );
  }
}
export default App;
