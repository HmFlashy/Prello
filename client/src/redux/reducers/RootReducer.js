import {combineReducers} from 'redux';
import cardReducer from './CardReducer';
import boardReducer from './BoardReducer';
import listReducer from './ListReducer';

export default combineReducers({
 cardReducer,
 boardReducer,
 listReducer
});