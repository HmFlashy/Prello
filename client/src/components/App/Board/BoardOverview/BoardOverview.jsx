import React, {Component} from "react";
import {Card, Icon, List, Segment} from "semantic-ui-react"

class BoardOverview extends Component {

    constructor() {
        super();
        this.displayBoard = this.displayBoard.bind(this)
        this.changeStarState = this.changeStarState.bind(this)
        this.starBoard = this.starBoard.bind(this)
        this.state = {
            isHoverStar: false
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

    starBoard() {
        if (this.props.isStarred) {
            this.props.unstarBoard(this.props.userId)
        } else {
            this.props.starBoard(this.props.userId)
        }
    }

    render() {
        return (
            <Card>
                <Card.Content onClick={this.displayBoard}>
                    {this.props.board ? this.props.board.name : ""}
                </Card.Content>
                <Card.Content><span onClick={this.starBoard}
                              onMouseEnter={() => this.changeStarState}
                              onMouseOut={() => this.changeStarState}>
                     <Icon disabled={!this.state.isHoverStar}
                           name={this.props.isStarred ?"star":"star outline"}/>
                        </span>
                </Card.Content>
            </Card>
        );
    }
}
export default BoardOverview