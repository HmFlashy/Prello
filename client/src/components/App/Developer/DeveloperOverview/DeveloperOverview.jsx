import './DeveloperOverview.css'
import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { List } from 'semantic-ui-react';
import DeveloperApplication from '../DeveloperApplication';
import NewDeveloperApplication from '../NewDeveloperApplication';
import DeveloperApplicationDetail from '../DeveloperApplicationDetail';

class DeveloperOverview extends Component {

    constructor(props){
        super(props)
        this.state = {
            currentApplication: null,
            isAddingAnApp: false
        }
        this.changeCurrentApplication = this.changeCurrentApplication.bind(this)
        this.addApplication = this.addApplication.bind(this)
    }

    changeCurrentApplication(name){
        this.setState({
            currentApplication: this.props.applications.find(app => app.name === name)
        })
        this.props.history.push(`/developer/app/${name}`)
    }

    addApplication(event){
        this.props.addApplication(event.target.value)
    }

    render(){
        return (
            <div className="developer-overview">
                <div className="do-applications">
                    <h1 className="do-title">
                        Your applications
                    </h1>
                    <div className="do-list">
                        <List divided verticalAlign='middle'>
                            <div className="arrow-down" />
                            {
                                this.props.applications.length > 0 ?
                                    this.props.applications.map(application => 
                                        <List.Item className="do-list-item" key={ application.name } onClick={() => this.changeCurrentApplication(application.name)}><DeveloperApplication application={application} /></List.Item>
                                    ) :
                                    <p>No applications</p>
                            }
                            <List.Item className="do-list-item"><NewDeveloperApplication addApplication={this.addApplication} /></List.Item>
                        </List>
                    </div>
                </div>
                {
                    this.state.currentApplication ? 
                        <DeveloperApplicationDetail addURI={this.props.addURI} removeURI={this.props.removeURI} application={this.props.applications.find(app => app._id === this.state.currentApplication._id)} /> :
                        <div className="no-application">
                            <h1 className="no-application-content">Choose an application</h1>
                        </div>
                }
            </div>
        )
    }
}

export default withRouter(DeveloperOverview)