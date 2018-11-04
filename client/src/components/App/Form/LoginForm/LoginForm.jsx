import './LoginForm.css'
import React, { Component } from 'react'
import { Grid, Header, Image, Segment, Form, Button, Message } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class LoginForm extends Component {

    constructor(){
        super()
        this.authenticate = this.authenticate.bind(this)
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    async authenticate(){
        try {
            await this.props.authenticate(this.state.email, this.state.password)
            this.props.history.push(this.props.location.redirect || { pathname: '/home' })
        } catch(error) {
        }
    }

    changeEmail(email){
        this.setState({
            email: email
        })
    }

    changePassword(password){
        this.setState({
            password: password
        })
    }

    render(){
        return (
            <div className='login-form'>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                        <Image src='/logo.png' /> Log-in to your account
                        </Header>
                        {
                            this.props.error ?
                                
                            <Message color='red' hidden={!this.props.error}>{this.props.error}</Message> : null
                        }
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Input fluid icon='user' onChange={(event) => this.changeEmail(event.target.value)} iconPosition='left' placeholder='E-mail address' />
                                <Form.Input
                                fluid
                                icon='lock'
                                iconPosition='left'
                                placeholder='Password'
                                type='password'
                                onChange={(event) => this.changePassword(event.target.value)}
                                />

                                <Button color='teal' onClick={this.authenticate} fluid size='large'>
                                    Login
                                </Button>
                            </Segment>
                        </Form>
                        <Message className="clickable" onClick={() => this.props.history.push('/register')}>
                            New to us?  SIGN UP
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default withRouter(LoginForm)