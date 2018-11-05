import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import "./App.css";
import AuthentificationPage from './pages/AuthentificationPage'
import BoardPage from './pages/BoardPage'
import { ConnectedRouter } from 'connected-react-router'
import { history } from './history'
import HomePage from './pages/HomePage'
import WelcomePage from "./pages/WelcomePage";

import { Provider } from 'react-redux'
import configureStore from './redux/store'
import { DragDropContext } from 'react-beautiful-dnd';
import TeamPage from "./pages/TeamPage";

class App extends Component {
  onDragStart = (data) => {
    console.log("STARTING DRAG")
    console.log(data)
  };
  onDragUpdate = (data) => {
    console.log("UPDATE DRAG")
    console.log(data)
  };
  onDragEnd = (data) => {
    console.log("END DRAG")
    console.log(data)
  };

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
                <Route exact path="/welcome" component={WelcomePage} />
                <Route exact path="/login" component={AuthentificationPage} />
                <Route exact path="/register" component={AuthentificationPage} />
                <Route exact path="/home" component={HomePage} />
                <Route exact path="/boards/:boardId" component={BoardPage} />
                <Route exact path="/card/:cardId" component={BoardPage} />
                <Redirect to="/welcome" />
              </Switch>
            </div>
          </ConnectedRouter >
        </Provider >
      </DragDropContext>
                  <Route exact path="/team"             component={TeamPage} />
    );
  }
}
export default App;
