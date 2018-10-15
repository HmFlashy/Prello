import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import createHistory from 'history/createBrowserHistory'
import Card from './components/App/Card'
 
const history = createHistory()

class App extends Component {

    render() {
        return (
            <BrowserRouter history={history}>
                <div className="App">
                    <Link to="/login">Home</Link>{' '}
                    <Link to={{pathname: '/'}}>About</Link>{' '}
                    <Link to="/contact">Contact</Link>
                    <Switch>
                        <Route path="/login">
                            <Card></Card>
                        </Route>
                        <Route path= "">
                            <div>
                                <header className="App-header">
                                    <img src={logo} className="App-logo" alt="logo" />
                                    <h1 className="App-title">Welcome to React</h1>
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