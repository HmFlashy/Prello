import React from 'react';
import Move from './Move'
import BoardContainer from '../../../../../../../../services/BoardServices'

export default class MoveContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
        this.changeBoard = this.changeBoard.bind(this)
        this.onChangeList = this.onChangeList.bind(this)
        this.onChangePos = this.onChangePos.bind(this)
    }

    async componentDidMount() {
        await this.changeBoard(this.props.boardId)
        const boards = await BoardContainer.fetchBoards()
        this.setState({ boards })
    }

    async changeBoard(boardId) {
        const info = await BoardContainer.fetchBoardInfo(boardId)
        info.lists = info.lists.map(list => {
            let possiblePos = []
            if (list.cards.length === 0) {
                possiblePos.push({ userPos: 1, pos: 100000 })
                return { ...list, possiblePos }
            }
            else {
                possiblePos.push({ userPos: 1, pos: list.cards[0] / 2 })
                list.cards.forEach((pos, i) => {
                    (i === list.cards.length - 1)
                        ? possiblePos.push({ userPos: i + 2, pos: pos + 100000 })
                        : possiblePos.push({ userPos: i + 2, pos: (list.cards[i + 1] + pos) / 2 })
                })
                return { ...list, possiblePos }
            }
        })
        this.setState({ info, currentBoard: { _id: info._id, name: info.name }, currentList: info.lists[0], currentPos: info.lists[0].possiblePos[0] })
    }

    onChangeList(list) {
        this.setState({ currentList: list, currentPos: { userPos: 1, pos: list.cards[0] / 2 } })
    }

    onChangePos(pos) {
        console.log(pos)
        this.setState({ currentPos: pos })
    }

    render() {
        return <Move {...this.props}
            info={this.state.info}
            boards={this.state.boards}
            currentBoard={this.state.currentBoard}
            currentList={this.state.currentList}
            currentPos={this.state.currentPos}
            onBoardChange={(boardId => this.changeBoard(boardId))}
            onListChange={(list) => this.onChangeList(list)}
            onPosChange={(pos) => this.onChangePos(pos)}
        />;
    }
}
