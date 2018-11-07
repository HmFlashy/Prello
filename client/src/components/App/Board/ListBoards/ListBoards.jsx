import React, {Component} from "react";
import "../Board/Board.css"
import ListBoardsFilterContainer from "../../../../containers/BoardContainer/ListBoardsFilterContainer"
import {Button, Dropdown, Ref} from "semantic-ui-react";
import DynamicInput from "../../Input/DynamicInput";

class ListBoards extends Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.getCurrentValues = this.getCurrentValues.bind(this);
        this.deleteCategory = this.deleteCategory.bind(this);
        this.getCategoryOptions = this.getCategoryOptions.bind(this);
        this.handleCategoryName = this.handleCategoryName.bind(this);
        this.updateCategory = this.updateCategory.bind(this);
        this.updateCategoryName = this.updateCategoryName.bind(this);
        this.cancelUpdate = this.cancelUpdate.bind(this);
        this.state = {
            currentValues: [],
            categoryOptions: [],
            currentEditValue: null,
            categoryName: null
        }
    }

    componentWillMount() {
        this.setState({categoryOptions: this.getCategoryOptions()})
    }

    handleChange(e, {value}) {
        const categoryOptions = this.getCategoryOptions()
        if (!value.some(categoryValue => (!categoryOptions.map(category => category.value).includes(categoryValue)
            || categoryValue === this.state.currentEditValue))) {
            this.setState({
                currentValues: value
            });
        }
    }

    handleAddition = async (e, {value}) => {
        await this.props.addCategory(value);
    }

    getCurrentValues() {
        return (this.state.currentValues.length === 0 ? this.getCategoryOptions().map(category => category.value) : this.state.currentValues)
    }

    deleteCategory = async (e, id) => {
        e.stopPropagation();
        await this.props.deleteCategory(id);
    }

    updateCategoryName = async (e, id) => {
        await this.props.updateCategoryName(id, this.state.categoryName);
        this.setState({currentEditValue: null})
    }

    cancelUpdate = (e) => {
        e.stopPropagation()
        this.setState({currentEditValue: null})
    }

    handleCategoryName = e => {
        e.stopPropagation()
        console.log(e.target.value)
        this.setState({categoryName: e.target.value})
    }

    updateCategory = (e, id, name) => {
        e.stopPropagation();
        this.setState({currentEditValue: id, categoryName: name})
    }

    getCategoryOptions() {
        return [{
            key: "No Category",
            value: "No Category",
            text: "No Category",
            content: <div>No Category</div>
        }, ...this.props.categories.map(category => {
            if (this.state.currentEditValue === category._id) {
                return {
                    key: category._id, value: category._id, text: category.name,
                    content: <div>
                        <input onClick={(event) => event.stopPropagation()} value={this.state.categoryName}
                               onChange={this.handleCategoryName}/>
                        <Button
                            onClick={(event) => this.updateCategoryName(event, category._id)}
                            positive>Validate</Button>
                        <Button onClick={this.cancelUpdate} negative>Cancel</Button>
                    </div>
                }
            } else {
                return {
                    key: category._id, value: category._id, text: category.name,
                    content: <div>{category.name}
                        <Button onClick={(event) => this.updateCategory(event, category._id, category.name)}
                                positive>Update</Button>
                        <Button onClick={(event) => this.deleteCategory(event, category._id)} negative>Delete</Button>
                    </div>
                }
            }
        })]
    }

    render() {
        const currentValues = this.getCurrentValues();
        return (
            <div>
                <h1>Your Boards</h1>
                <Dropdown
                    options={this.getCategoryOptions()}
                    placeholder='Choose Categories'
                    search
                    selection
                    fluid
                    multiple
                    allowAdditions
                    value={this.state.currentValues}
                    onChange={this.handleChange}
                    onAddItem={this.handleAddition}
                >
                </Dropdown>
                <ListBoardsFilterContainer key={1} categories={currentValues} onlyStars={true} noTeam={false}
                                           title={"Your starred boards"}/>
                <ListBoardsFilterContainer key={2} categories={currentValues} onlyStars={false} noTeam={true}
                                           title={"Your personal boards"}/>
                {this.props.teams.map(team => (
                    <ListBoardsFilterContainer key={team.team._id} teams={[team.team._id]} title={team.team.name}
                                               categories={currentValues} onlyStars={false} noTeam={false}/>
                ))}
            </div>
        )
    }
}

export default ListBoards