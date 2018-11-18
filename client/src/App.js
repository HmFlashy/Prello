import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import AuthentificationPage from './pages/AuthentificationPage'
import BoardPage from './pages/BoardPage'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './history'
import HomePage from './pages/HomePage'
import DeveloperPage from './pages/DeveloperPage'

import { Provider } from 'react-redux'
import configureStore from './redux/configureStore'
import { DragDropContext } from 'react-beautiful-dnd';
import TeamPage from "./pages/TeamPage";
import MePage from "./pages/MePage";

class App extends Component {
  render() {
    return (
      <DragDropContext
        onDragStart={this.onDragStart}
        onDragUpdate={this.onDragUpdate}
        onDragEnd={this.onDragEnd}
      >

        <Provider store={configureStore()}>
          <ConnectedRouter history={history}>
            <div className="App">
              <Switch>
                <Route exact path="/login" component={AuthentificationPage} />
                <Route exact path="/register" component={AuthentificationPage} />
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/boards/:boardId" component={BoardPage} />
                <Route exact path="/card/:cardId" component={BoardPage} />
                <Route exact path="/team/:teamId" component={TeamPage} />
                <Route exact path="/me" component={MePage} />
                <Route exact path="/developer/app/:idApp" component={DeveloperPage} />
                <Route exact path="/developer" component={DeveloperPage} />
                <Redirect to="/login" />
              </Switch>
            </div>
          </ConnectedRouter >
        </Provider >
      </DragDropContext>
    );
  }
}
export default App;
