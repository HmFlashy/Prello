import React, {Component} from "react";
import {Card, Icon, List, Modal, Rail, Segment} from "semantic-ui-react"
import "./BoardOverview.css"
import BoardOverviewModalContainer from "../../../../containers/BoardContainer/BoardOverviewModalContainer";
import { withRouter } from 'react-router-dom'

class BoardOverview extends Component {

    constructor(props) {
        super(props);
        this.displayBoard = this.displayBoard.bind(this);
        this.changeStarState = this.changeStarState.bind(this);
        this.starBoard = this.starBoard.bind(this);
        this.closeBoardUpdateModal = this.closeBoardUpdateModal.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
        this.state = {
            isHoverStar: false,
            boardModal: false
        }
    }

    changeStarState() {
        this.setState({
            isHoverStar: !this.state.isHoverStar
        })
    }

    displayBoard() {
        this.props.history.push(`/boards/${this.props.board._id}`)
    }

    starBoard(event) {
        event.stopPropagation();
        if (this.props.isStarred) {
            this.props.unstarBoard(this.props.userId)
        } else {
            this.props.starBoard(this.props.userId)
        }
    }

    updateBoard(event) {
        event.stopPropagation();
        this.setState({boardModal: true})
    }

    closeBoardUpdateModal(){
        this.setState({boardModal: false})
    }

    render() {
        return (
            <div>
                <Card className="board-item" onClick={this.displayBoard}>
                    <Card.Content>
                        <h1>{this.props.board ? this.props.board.name : ""}</h1>
                     <Icon onClick={this.starBoard}
                           onMouseEnter={() => this.changeStarState}
                           onMouseOut={() => this.changeStarState} disabled={!this.state.isHoverStar}
                           name={this.props.isStarred ? "star" : "star outline"}/>
                            {this.props.board ? this.props.board.boardInformation.nbStars : 0}
                        <Icon name="user circle"/>
                            {this.props.board ? this.props.board.boardInformation.nbMembers : 1}
                        <Icon name={"pencil"} onClick={this.updateBoard}/>
                    </Card.Content>
                </Card>
                <BoardOverviewModalContainer closeBoardUpdateModal={this.closeBoardUpdateModal} isOpen={this.state.boardModal}
                                             key={this.props.boardId} boardId={this.props.boardId}/>
            </div>
        );
    }
}

export default withRouter(BoardOverview)