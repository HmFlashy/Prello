import './RegisterForm.css'
import React, { Component } from 'react'
import { Grid, Header, Image, Segment, Form, Button, Message } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

class RegisterForm extends Component {

    constructor(){
        super()
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
                                <Form.Input fluid icon='user' iconPosition='left' placeholder='E-mail address' />
                                    <Form.Input
                                    fluid
                                    icon='lock'
                                    iconPosition='left'
                                    placeholder='Password'
                                    type='password'
                                    />

                                    <Button color='teal' onClick={() => this.props.history.push('/home')} fluid size='large'>
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

export default withRouter(RegisterForm)