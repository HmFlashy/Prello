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
        this.createChecklist = this.createChecklist.bind(this);
        this.deleteChecklist = this.deleteChecklist.bind(this);
        this.updateChecklist = this.updateChecklist.bind(this);
        this.onAddItem = this.onAddItem.bind(this);
        this.onDeleteItem = this.onDeleteItem.bind(this);
        this.onUpdateItem = this.onUpdateItem.bind(this);
        this.moveCard = this.moveCard.bind(this);
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

    createChecklist(data) {
        this.props.createChecklist(this.props.card._id, data)
    }

    deleteChecklist(checklistId) {
        this.props.deleteChecklist(this.props.card._id, checklistId)
    }

    updateChecklist(checklistId, oldVal, newVal, name) {
        this.props.updateChecklist(this.props.card._id, checklistId, oldVal, { _id: this.props.card._id, ...newVal }, name)
    }

    onAddItem(checklistId, data) {
        this.props.addItemToChecklist(this.props.card._id, checklistId, data)
    }

    onDeleteItem(checklistId, itemId) {
        this.props.deleteItemToChecklist(this.props.card._id, checklistId, itemId)
    }

    onUpdateItem(checklistId, itemId, oldVal, newVal, data) {
        let cardInfo
        if (data.hasOwnProperty('isChecked')) {
            cardInfo = data.isChecked ? { ...this.props.card.cardInformation, nbItemsChecked: this.props.card.cardInformation.nbItemsChecked + 1 } : { ...this.props.card.cardInformation, nbItemsChecked: this.props.card.cardInformation.nbItemsChecked - 1 }
        }
        this.props.updateItemToChecklist(this.props.card._id, checklistId, itemId, oldVal, { _id: this.props.card._id, ...newVal, cardInformation: cardInfo }, data)
    }

    moveCard(data) {
        this.props.moveCard(this.props.card._id, data)
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
                                <CheckList
                                    className="checkListContainer"
                                    checklists={this.props.card.checklists}
                                    onDelete={(checklistId) => this.deleteChecklist(checklistId)}
                                    onChangeName={(checklistId, oldVal, newVal, name) => this.updateChecklist(checklistId, oldVal, newVal, name)}
                                    onAddItem={(checklistId, name) => this.onAddItem(checklistId, { _id: this.props.card._id, name })}
                                    onDeleteItem={(checklistId, itemId) => this.onDeleteItem(checklistId, itemId)}
                                    onUpdateItem={(checklistId, itemId, oldVal, newVal, data) => this.onUpdateItem(checklistId, itemId, oldVal, newVal, data)}
                                ></CheckList>
                                <Divider />
                            </div>
                            : ""}
                        <Comment></Comment>
                        <Divider />
                        <Activity></Activity>
                    </div>
                    <Menu
                        card={this.props.card}
                        isArchived={this.props.card.isArchived}
                        onDueDate={(date) => this.updateCard({ dueDate: this.props.card.dueDate, _id: this.props.card._id }, { dueDate: date, _id: this.props.card._id })}
                        onArchive={(value) => this.updateCard({ isArchived: this.props.card.isArchived, _id: this.props.card._id }, { isArchived: value, _id: this.props.card._id })}
                        onChecklist={(value) => this.createChecklist({ name: value, _id: this.props.card._id })}
                        onMove={(boardId, oldListId, newListId, pos) => this.moveCard({ boardId, oldListId, newListId, pos, _id: this.props.card._id })}
                    />
                </div>
            </div>
            : <Loader />
    }
}

export default CardDetail
