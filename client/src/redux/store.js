import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/RootReducer';
import socketIO from '../services/SocketService'
import { connectRouter, routerMiddleware } from 'connected-react-router'
import { history } from '../history'

export default function configureStore(initialState={}) {
    const store = createStore(
        connectRouter(history)(rootReducer), 
        process.env.NODE_ENV !== "production" && window.__REDUX_DEVTOOLS_EXTENSION__ ? 
            compose(
                applyMiddleware(routerMiddleware(history), thunk), window.__REDUX_DEVTOOLS_EXTENSION__()
            ) : 
            compose(
                applyMiddleware(routerMiddleware(history), thunk)
            )
    );
    socketIO.init(store)
    return store
}