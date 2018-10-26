import React, { Component } from 'react';
import './CardDetail.css'
import { TextArea, Icon, Divider, Form, Button, Loader, Segment } from 'semantic-ui-react'
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
import moment from 'moment';

class CardDetail extends Component {

    constructor() {
        super()
        this.textToTextInput = this.textToTextInput.bind(this)
        this.updateCard = this.updateCard.bind(this)
        this.state = {
            descriptionTextArea: "",
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

    updateCard(oldValue, data) {
        console.log(data)
        this.props.updateCard(this.props.card._id, oldValue, data)
    }

    render() {
        return this.props.card.name != null ?
            <div className="displayColumn main">
                {this.props.card.isArchived
                    ? <Segment inverted color='orange' textAlign="center" size="medium"><Icon name="archive" size="large"></Icon>This card is archived</Segment>
                    : ""
                }
                <Header name={this.props.card.name} list={this.props.card.list} ></Header>
                <Divider />
                <div className={this.state.width > 600 ? "displayRow main" : "main"}>
                    <div className="details main">
                        {(this.props.card.members && this.props.card.members.length !== 0) || (this.props.card && this.props.card.labels.length !== 0) || this.props.card.dueDate
                            ? <div>
                                <div className="inline">
                                    <Icon name='tags' />
                                    {this.props.card.members && this.props.card.members.length !== 0
                                        ? <Members className="membersContainer" members={this.props.card.members}></Members>
                                        : ""}
                                    {this.props.card.labels && this.props.card.labels.length !== 0
                                        ? <Labels className="labelsContainer" labels={this.props.card.labels}></Labels>
                                        : ""}
                                    {this.props.card.dueDate
                                        ? <DueDate className="duedateContainer" onChange={(isChecked) => this.updateCard({ dueDateCompleted: this.props.card.dueDateCompleted, _id: this.props.card._id }, { dueDateCompleted: isChecked ? moment() : null, _id: this.props.card._id })} date={this.props.card.dueDate} isCompleted={this.props.card.dueDateCompleted}></DueDate>
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
                                    <Form className="form" onSubmit={() => this.updateCard({ desc: this.props.card.desc, _id: this.props.card._id }, { desc: this.state.descriptionTextArea, _id: this.props.card._id })}>
                                        <p>Describe me</p>
                                        <Form.Field>
                                            <TextArea onChange={(event, data) => this.setState({ descriptionTextArea: data.value })} rows={2} placeholder="Describe me..." />
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
                    <Menu
                        isArchived={this.props.card.isArchived}
                        onDueDate={(date) => this.updateCard({ dueDate: this.props.card.dueDate, _id: this.props.card._id }, { dueDate: date, _id: this.props.card._id })}
                        onArchive={(value) => this.updateCard({ isArchived: this.props.card.isArchived, _id: this.props.card._id }, { isArchived: value, _id: this.props.card._id })}
                    />
                </div>
            </div>
            : <Loader />
    }
}

export default CardDetail
