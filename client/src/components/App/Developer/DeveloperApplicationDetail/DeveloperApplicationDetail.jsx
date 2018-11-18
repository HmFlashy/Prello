import React, { Component } from 'react'
import './DeveloperApplicationDetail.css'
import PropTypes from 'prop-types';
import { Grid, Segment, List, Input, Button, Ref } from 'semantic-ui-react';

class DeveloperApplicationDetail extends Component {

    constructor(props){
        super(props)
        this.state = {
            uri: ''
        }
        this.updateURI = this.updateURI.bind(this)
        this.addURI = this.addURI.bind(this)
        this.removeURI = this.removeURI.bind(this)
    }

    updateURI(event){
        this.setState({
            uri: event.target.value,
            error: false
        })
    }

    async addURI(){
        if(this.state.uri !== '') {
            try {
                await this.props.addURI(this.props.application._id, this.state.uri)
                this.setState({
                    uri: '',
                    error: false
                })
                this.uriInput.value = ''
            } catch(error){

            }

        } else {
            this.setState({
                error: true
            })
        }
    }

    async removeURI(uri){
        try {
            await this.props.removeURI(this.props.application._id, uri)
            this.setState({
                uri: '',
                error: false
            })
            this.uriInput.value = ''
        } catch(error){

        }

    }

    render(){
        return (
            <div className="di-application-detail">
                <div className="wrapper">
                    <h1 className="di-title">{ this.props.application.name }</h1>
                    <div className="di-information">
                        <Segment>
                            <h3 className="di-header">Credentials</h3>
                            <Grid columns="equal" divided>
                                <Grid.Row>
                                    <Grid.Column textAlign="left"><p>Client ID</p></Grid.Column>
                                    <Grid.Column textAlign="right">{ this.props.application.id }</Grid.Column>
                                </Grid.Row>
                                <Grid.Row>
                                    <Grid.Column textAlign="left">Client Secret</Grid.Column>
                                    <Grid.Column textAlign="right">{ this.props.application.secret }</Grid.Column>
                                </Grid.Row>
                            </Grid>
                        </Segment>
                        <Segment>
                            <h3 className="di-header">Redirect URIs</h3>
                            <List className="text-align-left" verticalAlign="middle">
                                {
                                    this.props.application.redirectUris.map(redirectUri => 
                                        <List.Item key={ redirectUri } className="di-redirect-uri">
                                            { redirectUri }
                                            <Button onClick={() => this.removeURI(redirectUri)} className="di-button" color="red">Remove</Button>
                                        </List.Item>
                                    )
                                }
                                <List.Item className="text-align-left add-uri-item">
                                    <Ref innerRef={(node) => this.uriInput = node.children[0]}><Input error={this.state.error} onChange={(event) => this.updateURI(event)} className="di-ru-input" size="" placeholder="Enter a redirect URI" type="text"/></Ref>
                                    <div className="add-uri-button">
                                        <Button onClick={this.addURI}  color="green">
                                            Add URI
                                        </Button>
                                    </div>
                                </List.Item>
                            </List>
                        </Segment>
                    </div>
                </div>
            </div>
        )
    }
}

DeveloperApplicationDetail.propTypes = {
    application: PropTypes.shape({
        name: PropTypes.string.isRequired,
        id: PropTypes.string.isRequired,
        secret: PropTypes.string.isRequired,
        redirectUris: PropTypes.arrayOf(PropTypes.string)
    })
}

export default DeveloperApplicationDetail