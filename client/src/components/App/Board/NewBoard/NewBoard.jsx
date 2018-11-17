import React, { Component } from "react";
import { Button } from "semantic-ui-react";
import './NewBoard.css'

class NewBoard extends Component {

    render() {
        return (
            <Button className="newBoard" onClick={this.props.changeVisibility} icon={"plus"} color="green" inverted circular />
        )
    }
}

export default NewBoard