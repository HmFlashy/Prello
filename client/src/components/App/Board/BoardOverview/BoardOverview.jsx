import React, {Component} from "react";
import {Card, Icon, List, Modal, Rail, Segment, Label} from "semantic-ui-react"
import "./BoardOverview.css"
import BoardOverviewModalContainer from "../../../../containers/BoardContainer/BoardOverviewModalContainer";
import {withRouter} from "react-router-dom"

class BoardOverview extends Component {

    constructor(props) {
        super(props);
        this.displayBoard = this.displayBoard.bind(this);
        this.overStar = this.overStar.bind(this);
        this.unOverStar = this.unOverStar.bind(this);
        this.starBoard = this.starBoard.bind(this);
        this.closeBoardUpdateModal = this.closeBoardUpdateModal.bind(this);
        this.updateBoard = this.updateBoard.bind(this);
        this.state = {
            isHoverStar: false,
            boardModal: false
        }
    }

    overStar() {
        this.setState({
            isHoverStar: true
        })
    };

    unOverStar() {
        this.setState({
            isHoverStar: false
        })
    };

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

    closeBoardUpdateModal() {
        this.setState({boardModal: false})
    }

    render() {
        return (
            <div>
                <Card className="board-item" onClick={this.displayBoard}>
                    <Card.Content>
                        <p className="title">{this.props.board.name}</p>
                        <div className="board-overview-bottom">
                            <div>
                                <Label onClick={this.starBoard}
                                       onMouseEnter={this.overStar}
                                       onMouseOut={this.unOverStar}>
                                    <Icon className="bo-icon"
                                          onMouseEnter={this.overStar}
                                          onMouseOut={this.unOverStar}
                                          color={(!this.props.isStarred && this.state.isHoverStar)
                                          || (this.props.isStarred && !this.state.isHoverStar) ? "yellow" : "white"}
                                          name={(!this.props.isStarred && this.state.isHoverStar)
                                          || (this.props.isStarred && !this.state.isHoverStar) ? "star" : "star outline"}/>
                                    {this.props.board ? this.props.board.boardInformation.nbStars : 0}
                                </Label>
                                <Label>
                                    <Icon className="bo-icon" name="user circle"/>
                                    {this.props.board ? this.props.board.boardInformation.nbMembers : 1}
                                </Label>

                            </div>
                            <div>
                                <Label className="bo-labels" onClick={this.updateBoard}>
                                    <Icon className="bo-pencil-icon" name={"pencil"}/>
                                </Label>
                            </div>
                        </div>
                    </Card.Content>
                </Card>
                <BoardOverviewModalContainer closeBoardUpdateModal={this.closeBoardUpdateModal}
                                             isOpen={this.state.boardModal}
                                             key={this.props.boardId} boardId={this.props.boardId}/>
            </div>
        );
    }
}

export default withRouter(BoardOverview)