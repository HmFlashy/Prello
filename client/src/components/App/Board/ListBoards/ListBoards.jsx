import React, {Component} from "react";
import "../Board/Board.css"
import ListBoardsCategoryContainer from "../../../../containers/BoardContainer/ListBoardsCategoryContainer"
import ListBoardsStarContainer from "../../../../containers/BoardContainer/ListBoardsStarContainer"

class ListBoards extends Component {

    componentWillMount() {
        this.props.fetchBoards()
        this.props.getUser()
    }

    render() {
        return (
            <div>
                <h1>Your Boards</h1>
                <ListBoardsStarContainer/>
                {this.props.categories.map(category => (
                    <ListBoardsCategoryContainer key={category._id} categoryId={category._id}
                                                 categoryName={category.name}/>
                ))}
            </div>
        );
    }
}

export default ListBoards