import React, {Component} from "react";
import "../Board/Board.css"
import ListBoardsFilterContainer from "../../../../containers/BoardContainer/ListBoardsFilterContainer"
import {Dropdown} from "semantic-ui-react";

class ListBoards extends Component {

    constructor() {
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleAddition = this.handleAddition.bind(this);
        this.getCurrentValues = this.getCurrentValues.bind(this);
        this.state = {
            currentValues: []
        }
    }

    componentWillMount() {
    }

    handleChange(e, {value}) {
        console.log(value)
        if(!value.some(categoryValue => !this.props.categoryOptions.map(category => category.value).includes(categoryValue))) {
            this.setState({currentValues: value});
        }
    }

    handleAddition = async (e, { value }) => {
        await this.props.addCategory(value);
    }

    getCurrentValues() {
        return (this.state.currentValues.length===0?this.props.categoryOptions.map(category => category.value):this.state.currentValues)
            .map(category => category._id)
    }

    render() {
        return (
            <div>
                <h1>Your Boards</h1>
                <Dropdown
                    options={this.props.categoryOptions}
                    placeholder='Choose Categories'
                    search
                    selection
                    fluid
                    multiple
                    allowAdditions
                    value={this.state.currentValues}
                    onChange={this.handleChange}
                    onAddItem={this.handleAddition}
                />
                <ListBoardsFilterContainer key={1} categories={this.getCurrentValues()} onlyStars={true} noTeam={false} title={"Your starred boards"}/>
                <ListBoardsFilterContainer key={2} categories={this.getCurrentValues()} onlyStars={false} noTeam={true} title={"Your personal boards"}/>
                {this.props.teams.map(team => (
                    <ListBoardsFilterContainer key={team.team._id} teams={[team.team._id]} title={team.team.name}
                                             categories={this.getCurrentValues()} onlyStars={false} noTeam={false}/>
                ))}
            </div>
        );
    }
}

export default ListBoards