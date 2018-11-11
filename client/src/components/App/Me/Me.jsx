import React, { Component } from 'react';
import './Me.css'
import { Message, Grid, Button, TextArea, Form, Segment } from 'semantic-ui-react'

export default class Me extends Component {

    constructor(props) {
        super(props)
        this.updateField = this.updateField.bind(this)
        this.updateInfo = this.updateInfo.bind(this)
        this.state = {
            fullName: this.props.user.fullName,
            email: this.props.user.email,
            username: this.props.user.username,
            newPassword: '',
            newConfirmPassword: '',
            bio: this.props.user.bio,
            organization: this.props.user.organization
        }
    }

    componentDidMount() {
    }

    updateField(field) {
        this.setState(field)
    }

    async updateInfo() {
        if (await this.isFormValid()) {
            if ((!this.state.newPassword && !this.state.newConfirmPassword) || this.state.newPassword && this.state.newConfirmPassword && this.state.newConfirmPassword == this.state.newPassword) {
                const { fullName, email, username, bio, organization, newPassword } = this.state
                if ((newPassword != '' && newPassword.length > 8)) {
                    this.setState({ formError: false, passwordError: false })
                    this.props.updateProfile({
                        fullName, email, username, bio, organization, newPassword
                    })
                }
                else if (newPassword == '') {
                    this.setState({ formError: false, passwordError: false })
                    this.props.updateProfile({
                        fullName, email, username, bio, organization, newPassword
                    })
                }
                else {
                    this.setState({ formError: true, passwordError: true })
                }
            }
            else {
                this.setState({ formError: true, passwordError: true })
            }
        }
    }

    async isFormValid() {
        const setStates = [
            this.setState({ formError: false }),
            this.state.fullName === '' ? this.setState({ formError: true, fullNameError: true }) : this.setState({ fullNameError: false }),
            this.state.email === '' ? this.setState({ formError: true, emailError: true }) : this.setState({ emailError: false }),
            this.state.username === '' ? this.setState({ formError: true, usernameError: true }) : this.setState({ usernameError: false }),
            this.state.bio === '' ? this.setState({ formError: true, bioError: true }) : this.setState({ bioError: false }),
            this.state.organization === '' ? this.setState({ formError: true, organizationError: true }) : this.setState({ organizationError: false }),
        ]
        try {
            await Promise.all(setStates)
            return !this.state.formError
        } catch (error) {
            console.log(error)
        }
    }

    render() {
        return (
            <div className='register-form'>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Form size='large' error={this.state.formError}>
                            <Segment stacked>
                                <Form.Input fluid label='First name' value={this.state.fullName} onChange={(event) => this.updateField({ fullName: event.target.value })} placeholder='Full name' error={this.state.fullNameError} required />
                                <Form.Input fluid label='Username' value={this.state.username} onChange={(event) => this.updateField({ username: event.target.value })} placeholder='Username' error={this.state.usernameError} required />
                                <Form.Input fluid label='Email' type='email' value={this.state.email} icon='user' iconPosition='left' onChange={(event) => this.updateField({ email: event.target.value })} placeholder='E-mail address' error={this.state.emailError} required />
                                <Form.Group widths="equal">
                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='New password'
                                        type='password'
                                        onChange={(event) => this.updateField({ newPassword: event.target.value })}
                                        error={this.state.passwordError}
                                    />
                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Confirm new password'
                                        type='password'
                                        onChange={(event) => this.updateField({ newConfirmPassword: event.target.value })}
                                        error={this.state.passwordError}
                                    />
                                </Form.Group>
                                <Form.Input
                                    fluid
                                    icon='building'
                                    iconPosition='left'
                                    placeholder='Organization'
                                    type='text'
                                    value={this.state.organization}
                                    onChange={(event) => this.updateField({ organization: event.target.value })}
                                    error={this.state.organizationError}
                                    required
                                />
                                <Form.Field
                                    id='form-textarea-control-opinion'
                                    control={TextArea}
                                    value={this.state.bio}
                                    label='Bio'
                                    error={this.state.bioError}
                                    onChange={(event) => this.updateField({ bio: event.target.value })}
                                    placeholder='Bio'
                                />
                                <Button color='teal' onClick={this.updateInfo} fluid size='large'>
                                    Update info
                                </Button>
                            </Segment>
                        </Form>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

