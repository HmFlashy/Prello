import React, { Component } from 'react';
import './CardOverview.css'
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

class CardOverview extends Component {

    constructor(){
        super()
        this.textToTextInput = this.textToTextInput.bind(this)
        this.updateName = this.updateName.bind(this)
        this.state = {
            isNameUpdating: false
        }
    }

    componentDidMount(){
    }

    textToTextInput(){
        this.setState({
            isNameUpdating: true
        })
    }

    updateName(name){
        this.setState({
            isNameUpdating: false
        })
        this.props.updateName(this.props.card._id, name)
    }

    render(){
        return (
            <Card className='cardOverview'>
                <CardContent>
                    <Typography variant="h5" component="h2" onClick={this.textToTextInput}>
                        { !this.state.isNameUpdating ? this.props.card.name : <input type="text" name="name" placeholder= {this.props.card.name} onKeyPress={(event) => event.charCode === 13 ? this.updateName(event.target.value) : null}></input> }
                    </Typography>
                    <Typography className='pos' color="textSecondary">
                        adjective
                    </Typography>
                </CardContent>
            </Card>
        )
    }
}

export default CardOverview
