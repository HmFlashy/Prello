import React, { Component } from 'react'
import './DeveloperApplicationDetail.css'
import PropTypes from 'prop-types';
import { Grid, Segment, List, Input, Button } from 'semantic-ui-react';

class DeveloperApplicationDetail extends Component {

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
                                        <List.Item className="di-redirect-uri">
                                            { redirectUri }
                                            <Button className="di-button" color="red">Remove</Button>
                                        </List.Item>
                                    )
                                }
                                <List.Item className="text-align-left"><Input className="di-ru-input" size="" placeholder="Enter a redirect URI" type="text"/></List.Item>
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