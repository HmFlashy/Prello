import React, {Component} from "react";
import { Card, Icon } from "semantic-ui-react";

class NewBoard extends Component {

    render(){
        return (
            <Card className="new-board" onClick={this.props.changeVisibility}>
                <Card.Content>
                    <h1>Create a new board</h1>
                    <span>
                        <Icon name="user circle"/>
                    </span>
                </Card.Content>
            </Card>
        )
    }
}

export default NewBoard