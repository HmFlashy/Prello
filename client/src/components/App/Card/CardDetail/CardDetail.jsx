import React, { Component } from 'react';
import './CardDetail.css'
import { TextArea, Icon, Divider, Form, Button, Loader } from 'semantic-ui-react'
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
        this.props.fetchCard(this.props.match.params.cardId)
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
        return (
            <div>
                    {
                        this.props.card.name != null ? (    
                            
                        <div className={this.state.width > 600 ? "displayRow main" : "main"}>
                            <div class="details main">
                                    <Header name={this.props.card.name} list={this.props.card.list} ></Header>
                                    <Divider />
                                    {(this.props.card.members && this.props.card.members.length !== 0) || (this.props.card && this.props.card.labels.length !== 0) || this.props.card.duedate
                                        ? <div>
                                            <div className="inline">
                                                <Icon name='tags' />
                                                {this.props.card.members && this.props.card.members.length !== 0
                                                    ? <Members className="membersContainer" members={this.props.card.members}></Members>
                                                    : ""}
                                                {this.props.card.labels && this.props.card.labels.length !== 0
                                                    ? <Labels className="labelsContainer" labels={this.props.card.labels}></Labels>
                                                    : ""}
                                                {this.props.card.duedate
                                                    ? <DueDate className="duedateContainer" date={this.props.card.duedate} isCompleted={false}></DueDate>
                                                    : ""}
                                            </div>
                                            <Divider />
                                        </div>
                                        : ""}
                                    {this.props.card.desc
                                        ? <div>
                                            <Description description={this.props.card.desc}></Description>
                                            <Divider />
                                        </div>
                                        : <div>
                                            <div className={"displayRow"}>
                                                <Icon name='align left' />
                                                <Form className="form">
                                                    <p>Describe me</p>
                                                    <Form.Field>
                                                        <TextArea rows={2} placeholder="Describe me..." />
                                                    </Form.Field>
                                                    <Button type='submit'>Submit</Button>
                                                </Form>
                                            </div>
                                            <Divider />
                                        </div>}

                                    {this.props.card.attachments && this.props.card.attachments.length !== 0
                                        ? <div>
                                            <Attachments className="attachmentsContainer" attachments={this.props.card.attachments}></Attachments>
                                            <Divider />
                                        </div>
                                        : ""}
                                    {this.props.card.checklists && this.props.card.checklists.length !== 0
                                        ? <div>
                                            <CheckList className="checkListContainer" checklists={this.props.card.checklists}></CheckList>
                                            <Divider />
                                        </div>
                                        : ""}
                                    <Comment></Comment>
                                    <Divider />
                                    <Activity></Activity>
                                </div>
                                <div>
                                    <Menu />
                                </div>
                            </div>
                            ) : <Loader />
                    }
                </div>
            )
    }
}

export default CardDetail
