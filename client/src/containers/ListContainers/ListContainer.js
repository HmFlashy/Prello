import { connect } from 'react-redux';
import listServices from '../../services/ListServices'
import cardServices from '../../services/CardServices'
import { actionUpdateListName, failedActionUpdateListName } from '../../redux/actions/ListActions'
import { failedActionAddCard } from '../../redux/actions/CardActions'
import list from '../../components/App/List/index'

const mapStateToProps = (state, ownProps) => {
    const list = state.lists.all.find(list => list._id === ownProps.listId);
    return {
        list: {
            ...list,
            cards: list.cards.filter(card => {
                const fullCard = state.cards.all.find(fullCard => fullCard._id === card._id);
                return fullCard.labels.some(label => {
                    if (state.boards.currentBoard.labelsFilter.length > 0) {
                        return state.boards.currentBoard.labelsFilter.includes(label._id)
                    } else return true
                })
            }).filter(card => {
                const fullCard = state.cards.all.find(fullCard => fullCard._id === card._id);
                console.log(fullCard)
                return fullCard.members.some(member => {
                    console.log(member)
                    if (state.boards.currentBoard.membersFilter.length > 0) {
                        return state.boards.currentBoard.membersFilter.includes(member._id)
                    } else return true
                })
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