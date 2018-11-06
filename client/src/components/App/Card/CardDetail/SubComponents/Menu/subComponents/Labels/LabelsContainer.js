import React from 'react';
import Labels from './Labels'
import BoardContainer from '../../../../../../../../services/BoardServices'

export default class LabelsContainer extends React.Component {

    constructor(props) {
        super(props)
        this.state = {}
    }
    
    updateLabels(cardLabels, boardLabels){

    }
    

    render() {
        return <Labels {...this.props}
        onLabels={(cardLabels, boardLabels)=> this.updateLabels(cardLabels, boardLabels)}
            // info={this.state.info}
            // cardLabels={this.state.cardLabels}
            // boardLabels={this.state.boardLabels}
        />;
    }
}
