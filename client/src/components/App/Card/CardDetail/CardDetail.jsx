import React, { Component } from 'react';
import './CardDetail.css'
import { Segment, Icon, Divider, TextArea, Form, Button } from 'semantic-ui-react'
import Menu from "./SubComponents/Menu"
import Members from "./SubComponents/Members"
import Labels from "./SubComponents/Labels"
import DueDate from "./SubComponents/DueDate"
import Attachments from './SubComponents/Attachments';
import CheckList from './SubComponents/CheckList';
import Comment from './SubComponents/Comment';
import Activity from './SubComponents/Activity';
import Description from './SubComponents/Description';
import Header from './SubComponents/Header';

class CardDetail extends Component {

    constructor() {
        super()
        this.textToTextInput = this.textToTextInput.bind(this)
        this.updateName = this.updateName.bind(this)
        this.state = {
            isNameUpdating: false,
            width: 0,
            height: 0
        }
        this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
    }
    componentDidMount() {
        this.updateWindowDimensions();
        window.addEventListener('resize', this.updateWindowDimensions);
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this.updateWindowDimensions);
    }

    updateWindowDimensions() {
        console.log(window.innerWidth)
        this.setState({ width: window.innerWidth, height: window.innerHeight });
    }


    textToTextInput() {
        this.setState({
            isNameUpdating: true
        })
    }

    updateName(name) {
        this.setState({
            isNameUpdating: false
        })
        this.props.updateName(this.props.card._id, name)
    }

    render() {
        console.log(this.props)
        return (
            <Segment className='cardDetails'>
                <div className={this.state.width > 600 ? "displayRow" : ""}>
                    <div class="details">
                        <Header name={this.props.card.name} list={this.props.card.list} ></Header>
                        <Divider />
                        <div className="inline">
                            <Icon name='tags' />
                            <Members className="membersContainer" members={this.props.card.members}></Members>
                            <Labels className="labelsContainer" labels={this.props.card.labels}></Labels>
                            <DueDate className="duedateContainer" date={this.props.card.duedate} isCompleted={false}></DueDate>
                        </div>
                        <Divider />
                        <Description description={this.props.card.desc}></Description>
                        <Divider />
                        <Attachments className="attachmentsContainer" attachments={this.props.card.attachments}></Attachments>
                        <Divider />
                        <CheckList className="checkListContainer" lol={console.log(this.props.card)} checklists={this.props.card.checklists}></CheckList>
                        <Divider />
                        <Comment></Comment>
                        <Divider />
                        <Activity></Activity>
                    </div>
                    <div>
                        <Menu />
                    </div>
                </div>
            </Segment>
        )
    }
}

export default CardDetail
