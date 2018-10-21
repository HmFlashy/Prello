import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/RootReducer';
import socketIO from '../services/SocketService'

export default function configureStore(initialState={}) {
    let middlewares = [applyMiddleware(thunk)]
    if(window.__REDUX_DEVTOOLS_EXTENSION__) 
        middlewares.push(window.__REDUX_DEVTOOLS_EXTENSION__())
    const store = createStore(
    rootReducer, 
    compose(middlewares) 
    );
    socketIO.init(store)
    return store
}