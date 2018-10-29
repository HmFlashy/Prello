import './LoginForm.css'
import React, { Component } from 'react'
import { Grid, Header, Image, Segment, Form, Button, Message, Ref } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class LoginForm extends Component {

    constructor(){
        super()
        this.authenticate = this.authenticate.bind(this)
        this.state = {
            email: '',
            password: ''
        }
    }

    authenticate(){
        this.props.authenticate(this.state.email, this.state.password)
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
                        <Message>
                        New to us? <button onClick={() => this.props.history.push('/register')}>Sign Up</button>
                        </Message>
                    </Grid.Column>
                </Grid>
            </div>
        )
    }
}

export default withRouter(LoginForm)