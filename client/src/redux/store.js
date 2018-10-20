import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers/RootReducer';
import socketIO from '../services/SocketService'

export default function configureStore(initialState={}) {
 const store = createStore(
  rootReducer, 
  compose(applyMiddleware(thunk), window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()) 
 );
 socketIO.init(store)
 return store
}