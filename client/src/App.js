import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';



class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Route path="/login"/>
                    <Route path= "">
                        <div>
                            <header className="App-header">
                                <img src={logo} className="App-logo" alt="logo" />
                                <h1 className="App-title">Welcome to React</h1>
                            </header>
                            <p className="App-intro">Salut</p>
                        </div>
                    </Route>
                </div>
            </BrowserRouter>
        );
    }
}
export default App;