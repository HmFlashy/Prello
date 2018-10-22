import {combineReducers} from 'redux';
import cardReducer from './CardReducer';
import boardReducer from './BoardReducer';
import listReducer from './ListReducer';
import cardModalReducer from './CardModalReducer';
export default combineReducers({
 cardReducer,
 boardReducer,
 listReducer,
 cardModalReducer
});