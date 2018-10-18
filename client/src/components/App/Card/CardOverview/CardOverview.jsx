import React, { Component } from 'react';
import './CardOverview.css'
import Card from "@material-ui/core/Card";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";

class CardOverview extends Component {

    constructor(){
    }

    componentDidMount(){
    }

    render(){
        return (
            <Card className='cardOverview'>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        { this.props.name }
                    </Typography>
                    <Typography className='pos' color="textSecondary">
                        adjective
                    </Typography>
                    <Typography component="p">
                        well meaning and kindly.
                        <br />
                        {'"a benevolent smile"'}
                    </Typography>
                {this.props.avatar}
                </CardContent>
            </Card>
        )
    }
}

export default CardOverview
