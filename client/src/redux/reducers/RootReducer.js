import { combineReducers } from 'redux';
import cardReducer from './CardReducer';
import boardReducer from './BoardReducer';

export default combineReducers({
 cardReducer,
 boardReducer
});