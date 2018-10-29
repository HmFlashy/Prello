import { combineReducers } from 'redux';
import cardReducer from './CardReducer';
import boardReducer from './BoardReducer';
import listReducer from './ListReducer';
import cardModalReducer from './CardModalReducer';
import errorReducer from './ErrorReducer';
import authentificationReducer from './AuthentificationReducer';
export default combineReducers({
    cards: cardReducer,
    boards: boardReducer,
    lists: listReducer,
    cardModal: cardModalReducer,
    errors: errorReducer,
    authentification: authentificationReducer
});