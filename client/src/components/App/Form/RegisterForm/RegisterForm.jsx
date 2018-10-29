import './RegisterForm.css'
import React, { Component } from 'react'
import { Grid, Header, Image, Segment, Form, Button, Message } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class RegisterForm extends Component {

    constructor(){
        super()
        this.updateField = this.updateField.bind(this)
        this.register = this.register.bind(this)
        this.state = {
            firstname: '',
            lastname: '',
            birthDate: '',
            email: '',
            pseudo: '',
            password: '',
            confirmPassword: '',
            organization: '',
            messageFormError: 'Please complete all required fields'
        }
    }

    updateField(field){
        this.setState(field)
    }

    async register(){
        const { firstname, lastname, pseudo, email, password, organization } = this.state
        try {
            if(await this.isFormValid()) {
                await this.props.register({
                    firstname,
                    lastname,
                    pseudo,
                    email,
                    password,
                    organization
                })
                this.props.history.push('/login')
            } else {
                console.log("Invalid")
            }
        } catch(error){
            console.log(error)
        }
    }

    async isFormValid(){
        const setStates = [
            this.setState({formError: false}),
            this.state.firstname === '' ? this.setState({ formError: true, firstnameError: true }) : this.setState({ firstnameError: false }),
            this.state.lastname === '' ? this.setState({ formError: true, lastnameError: true }) : this.setState({ lastnameError: false }),
            this.state.pseudo === '' ? this.setState({ formError: true, pseudoError: true }) : this.setState({ pseudoError: false }),
            this.state.email === '' ? this.setState({ formError: true, emailError: true }) : this.setState({ emailError: false }),
            this.state.birthDate === '' ? this.setState({ formError: true, birthDateError: true }) : this.setState({ birthDateError: false }),
            this.state.password.length > 8 ? this.setState({ passwordError: false }) : this.setState({ formError: true, passwordError: true }),
            this.state.confirmPassword !== this.state.password ? this.setState({ formError: true, confirmPasswordError: true }) : this.setState({ confirmPasswordError: false }),
            this.state.organization === '' ? this.setState({ formError: true, organizationError: true }) : this.setState({ organizationError: false }),
        ]
        try {
            await Promise.all(setStates)
            console.log(this.state)
            return !this.state.formError
        } catch(error) {
            console.log(error)
        }
    }


    render(){
        return (
            <div className='register-form'>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                        <Image src='http://cdn.onlinewebfonts.com/svg/img_411076.png' /> Sign up to Prello
                        </Header>
                        <Message color='red' hidden={!this.state.formError}>{this.state.messageFormError}</Message>
                        <Form size='large' error={this.state.formError}>
                            <Segment stacked>
                                <Form.Group widths='equal'>
                                    <Form.Input fluid label='First name' onChange={(event) => this.updateField({firstname: event.target.value})} placeholder='First name' error={this.state.firstnameError} required/>
                                    <Form.Input fluid label='Last name' onChange={(event) => this.updateField({lastname: event.target.value})}  placeholder='Last name' error={this.state.lastnameError} required/>
                                </Form.Group>
                                <Form.Input fluid label='Pseudo' onChange={(event) => this.updateField({pseudo: event.target.value})} placeholder='Pseudo' error={this.state.pseudoError} required />
                                <Form.Input fluid label={<label>Date of birth</label>} onChange={(event) => this.updateField({birthDate: event.target.value})} type="date" error={this.state.birthDateError} required />
                                <Form.Input fluid type='email' icon='user' iconPosition='left' onChange={(event) => this.updateField({email: event.target.value})} placeholder='E-mail address' error={this.state.emailError}  required/>
                                <Form.Group widths="equal">
                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Password'
                                        type='password'
                                        onChange={(event) => this.updateField({password: event.target.value})}
                                        error={this.state.passwordError}
                                        required
                                    />
                                    <Form.Input
                                        fluid
                                        icon='lock'
                                        iconPosition='left'
                                        placeholder='Confirm password'
                                        type='password'
                                        onChange={(event) => this.updateField({confirmPassword: event.target.value})}
                                        error={this.state.confirmPasswordError}
                                        required
                                    />
                                </Form.Group>
                                <Form.Input
                                    fluid
                                    icon='building'
                                    iconPosition='left'
                                    placeholder='Organization'
                                    type='text'
                                    onChange={(event) => this.updateField({organization: event.target.value})}
                                    error={this.state.organizationError}
                                    required
                                />
                                <Button color='teal' onClick={this.register} fluid size='large'>
                                    Sign up
                                </Button>
                            </Segment>
                        </Form>
                        <Message>
                        Already have an account ? <Button color="green" onClick={() => this.props.history.push('/login')}>Login</Button>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default withRouter(RegisterForm)