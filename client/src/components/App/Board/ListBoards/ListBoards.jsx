import React, { Component } from "react";
import "./ListBoards.css"
import ListBoardsFilterContainer from "../../../../containers/BoardContainer/ListBoardsFilterContainer"
import { Button, Dropdown, Icon, Ref, Divider } from "semantic-ui-react";
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
        this.setState({ categoryOptions: this.getCategoryOptions() })
    }

    handleChange(e, { value }) {
        const categoryOptions = this.getCategoryOptions()
        if (!value.some(categoryValue => (!categoryOptions.map(category => category.value).includes(categoryValue)
            || categoryValue === this.state.currentEditValue))) {
            this.setState({
                currentValues: value
            });
        }
    }

    handleAddition = async (e, { value }) => {
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
        if (this.state.categoryName && !this.props.categories.find(category => category.name === this.state.categoryName
            && category._id !== id)) {
            await this.props.updateCategoryName(id, this.state.categoryName);
            this.setState({ currentEditValue: null })
        }
    }

    cancelUpdate = (e) => {
        e.stopPropagation()
        this.setState({ currentEditValue: null })
    }

    handleCategoryName = e => {
        e.stopPropagation()
        console.log(e.target.value)
        this.setState({ categoryName: e.target.value })
    }

    updateCategory = (e, id, name) => {
        e.stopPropagation();
        this.setState({ currentEditValue: id, categoryName: name })
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
                            onChange={this.handleCategoryName} />
                        <Button icon={"check"} size={"mini"}
                            onClick={(event) => this.updateCategoryName(event, category._id)}
                            positive />
                        <Button icon={"redo"} size={"mini"} onClick={this.cancelUpdate} negative />
                    </div>
                }
            } else {
                return {
                    key: category._id, value: category._id, text: category.name,
                    content: <div className="displayRow">
                        <p className="margin-right-categories">{category.name}</p>
                        <Button icon={"pencil"} size={"mini"} onClick={(event) => this.updateCategory(event, category._id, category.name)}
                            color={"yellow"} />
                        <Button icon={"delete"} size={"mini"} onClick={(event) => this.deleteCategory(event, category._id)} negative />
                    </div>
                }
            }
        })]
    }

    render() {
        const currentValues = this.getCurrentValues();
        return (
            <div className="displayRow board-flex background-color-list">
                <div className="board-flex-team">
                    <h1 className="title-list-boards">Your Teams</h1>
                    {this.props.teams.map(team =>
                        <Button onClick={() => this.props.history.push(`/team/${team.team._id}`)}>{team.team.name}</Button>
                    )
                    }
                </div>
                <div className="board-flex">
                    <h1 className="title-list-boards">Your Boards</h1>
                    <Dropdown
                        options={this.getCategoryOptions()}
                        placeholder='Choose Categories'
                        search
                        selection
                        clearable
                        fluid
                        multiple
                        allowAdditions
                        value={this.state.currentValues}
                        onChange={this.handleChange}
                        onAddItem={this.handleAddition}
                    >
                    </Dropdown>
                    <div className={"listBoards"}>
                        <ListBoardsFilterContainer key={1} categories={currentValues} onlyStars={true} noTeam={false}
                            title={"Your starred boards"} />
                    </div>
                    <div className={"listBoards"}>
                        <ListBoardsFilterContainer key={2} categories={currentValues} onlyStars={false} noTeam={true}
                            title={"Your personal boards"} />
                    </div>
                    <div className={"listBoards"}>
                        {this.props.teams.map(team => (
                            <ListBoardsFilterContainer key={team.team._id} teams={[team.team._id]} title={team.team.name}
                                categories={currentValues} onlyStars={false} noTeam={false} />
                        ))}
                    </div>
                </div>
            </div>
        )
    }
}

export default ListBoards