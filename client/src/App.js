import React, { Component } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";
import logo from "./logo.svg";
import "./App.css";
import createHistory from "history/createBrowserHistory";
import Card from "./components/App/Card";
import SimpleCard from "./components/App/SimpleCard";
import SimpleList from "./components/App/SimpleList";
import SimpleAvatar from "./components/App/SimpleAvatar";
import SimpleBoard from "./components/App/SimpleBoard";

const history = createHistory();

class App extends Component {
  render() {
    return (
      <BrowserRouter history={history}>
        <div className="App">
          <Link to="/login">Home</Link> <Link to={{ pathname: "/" }}>About</Link> <Link to="/contact">Contact</Link>
          <Switch>
            <Route path="/login">
              <Card />
            </Route>
            <Route path="">
              <div>
                <header className="App-header">
                  <SimpleBoard
                    lists={[
                      <SimpleList
                        title={"My list"}
                        cards={[
                          <SimpleCard title="Redux set-up" avatar={<SimpleAvatar initials="KG" />} />,
                          <SimpleCard title="Test material" avatar={<SimpleAvatar initials="KG" />} />
                        ]}
                      />,
                      <SimpleList
                        title={"My list"}
                        cards={[
                          <SimpleCard title="Redux set-up" avatar={<SimpleAvatar initials="KG" />} />,
                          <SimpleCard title="Test material" avatar={<SimpleAvatar initials="KG" />} />,
                          <SimpleCard title="Test material" avatar={<SimpleAvatar initials="KG" />} />,
                          <SimpleCard title="Redux set-up" avatar={<SimpleAvatar initials="KG" />} />,
                          <SimpleCard title="Test material" avatar={<SimpleAvatar initials="KG" />} />,
                          <SimpleCard title="Test material" avatar={<SimpleAvatar initials="KG" />} />
                        ]}
                      />,
                      <SimpleList
                        title={"My list"}
                        cards={[
                          <SimpleCard title="Redux set-up" avatar={<SimpleAvatar initials="KG" />} />,
                          <SimpleCard title="Test material" avatar={<SimpleAvatar initials="KG" />} />
                        ]}
                      />,
                      <SimpleList
                        title={"My list"}
                        cards={[
                          <SimpleCard title="Redux set-up" avatar={<SimpleAvatar initials="KG" />} />,
                          <SimpleCard title="Test material" avatar={<SimpleAvatar initials="KG" />} />
                        ]}
                      />,
                      <SimpleList
                        title={"My list"}
                        cards={[
                          <SimpleCard title="Redux set-up" avatar={<SimpleAvatar initials="KG" />} />,
                          <SimpleCard title="Test material" avatar={<SimpleAvatar initials="KG" />} />
                        ]}
                      />
                    ]}
                  />
                </header>
                <p className="App-intro">Salut</p>
              </div>
            </Route>
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}
export default App;
