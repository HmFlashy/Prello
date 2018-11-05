import React, {Component} from "react";
import { Card, Icon } from "semantic-ui-react";
import './NewBoard.css'

class NewBoard extends Component {

    render(){
        return (
            <Card className="board-item new-board"  onClick={this.props.changeVisibility}>
                <Card.Content>
                    <h1 style={{ color: "black" }}>Create a new board</h1>
                    <span>
                        <Icon name="bars"/>
                    </span>
                </Card.Content>
            </Card>
        )
    }
}

export default NewBoard