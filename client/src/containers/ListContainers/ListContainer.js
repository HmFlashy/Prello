import { connect } from 'react-redux';
import listServices from '../../services/ListServices'
import cardServices from '../../services/CardServices'
import { actionUpdateListName, failedActionUpdateListName } from '../../redux/actions/ListActions'
import { failedActionAddCard } from '../../redux/actions/CardActions'
import list from '../../components/App/List/index'
import { getDueDateMode } from '../../helpers/DateHelper'

const mapStateToProps = (state, ownProps) => {
    const list = state.lists.all.find(list => list._id === ownProps.listId);
    return {
        list: {
            ...list,
            cards: list.cards.filter(card => { // Labels filter
                const fullCard = state.cards.all.find(fullCard => fullCard._id === card._id);
                if(state.boards.currentBoard.labelsFilter.length > 0) {
                    if(fullCard.labels.length >0) {
                        if(state.boards.currentBoard.filterMode === "UNION") {
                            return fullCard.labels.some(label =>
                                state.boards.currentBoard.labelsFilter.includes(label._id)
                            )
                        } else {
                            return fullCard.labels.every(label =>
                                state.boards.currentBoard.labelsFilter.includes(label._id)
                            )
                        }
                    } else{
                        return state.boards.currentBoard.labelsFilter.includes("No Labels")
                    }
                } else return true
            }).filter(card => { // Members filter
                const fullCard = state.cards.all.find(fullCard => fullCard._id === card._id);
                if(state.boards.currentBoard.membersFilter.length > 0) {
                    if(fullCard.members.length >0) {
                        if(state.boards.currentBoard.filterMode === "UNION"){
                            return fullCard.members.some(member =>
                                state.boards.currentBoard.membersFilter.includes(member._id)
                            )
                        } else {
                            return fullCard.members.every(member =>
                                state.boards.currentBoard.membersFilter.includes(member._id)
                            )
                        }
                    } else {
                        return state.boards.currentBoard.membersFilter.includes("No Members")
                    }
                } else return true
            }).filter(card => { // Search filter
                const fullCard = state.cards.all.find(fullCard => fullCard._id === card._id);
                if(state.boards.currentBoard.searchFilter.length > 0) {
                    return fullCard.name.includes(state.boards.currentBoard.searchFilter)
                } else return true
            }).filter(card => { // Due date filter
                const fullCard = state.cards.all.find(fullCard => fullCard._id === card._id);
                if (state.boards.currentBoard.dueDateMode.length > 0) {
                    return getDueDateMode(fullCard.dueDate, fullCard.dueDateCompleted, state.boards.currentBoard.dueDateMode)
                } else return true
            })
        }
    }
};

const mapDispatchToProps = (dispatch, onwProps) => {
    return {
        async updateListName(list) {
            try {
                await listServices.updateListNameApi(list._id, list.name)
            } catch (error) {
                dispatch(failedActionUpdateListName(error))
            }
        },
        async addCard(name, listId, pos) {
            try {
                await cardServices.addCardApi(name, listId, pos)
            } catch (error) {
                console.log(error)
                return dispatch(failedActionAddCard(error))
            }
        }
    }
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(list);