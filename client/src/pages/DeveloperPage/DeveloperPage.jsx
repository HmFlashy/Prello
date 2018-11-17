import React, {Component} from "react"
import SecureLayoutContainer from "../../containers/SecureLayoutContainer";
import HeaderLayout from "../../components/App/Layout/HeaderLayout/HeaderLayout";
import ErrorLayoutContainer from "../../containers/ErrorLayoutContainer";
import DeveloperOverviewContainer from "../../containers/DeveloperContainers/DeveloperOverview"

class DeveloperPage extends Component {

    render() {
        return (
            <SecureLayoutContainer>
                <HeaderLayout>
                    <ErrorLayoutContainer>
                        <DeveloperOverviewContainer/>
                    </ErrorLayoutContainer>
                </HeaderLayout>
            </SecureLayoutContainer>
        )
    }
}

export default DeveloperPage