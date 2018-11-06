import "./HomePage.css"
import React, {Component} from "react"
import ListBoardsContainer from "../../containers/BoardContainer/ListBoardsContainer"
import SecureLayoutContainer from "../../containers/SecureLayoutContainer";
import HeaderLayout from "../../components/App/Layout/HeaderLayout/HeaderLayout";
import ErrorLayoutContainer from "../../containers/ErrorLayoutContainer";

class HomePage extends Component {

    render() {
        return (
            <SecureLayoutContainer>
                <HeaderLayout>
                    <ErrorLayoutContainer>
                        <ListBoardsContainer/>
                    </ErrorLayoutContainer>
                </HeaderLayout>
            </SecureLayoutContainer>
        )
    }
}

export default HomePage