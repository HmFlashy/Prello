import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Link } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import { connect } from 'react-redux';
import { simpleAction } from './redux/actions/simpleAction'
import createHistory from 'history/createBrowserHistory'
 
const history = createHistory()

class App extends Component {

    simpleAction = (event) => {
        this.props.simpleAction();
       }

    render() {
        return (
            <BrowserRouter history={history}>
                <div className="App">
                    <Link to="/login">Home</Link>{' '}
                    <Link to={{pathname: '/'}}>About</Link>{' '}
                    <Link to="/contact">Contact</Link>
                    <Switch>
                        <Route path="/login">
                            <div>
                                Mdr salut !
                            </div>
                        </Route>
                        <Route path= "">
                            <div>
                            <button onClick={this.simpleAction}>Test redux action</button>
                            <pre>
                            {
                            JSON.stringify(this.props)
                            }
                            </pre>
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
export default connect(
    state =>
        ({
        ...state
    })
    ,
    dispatch => {
        return {
            simpleAction: () => {
                dispatch(simpleAction())
            }
        }
    })(App)