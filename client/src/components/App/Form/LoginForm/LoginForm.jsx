import './LoginForm.css'
import React, { Component } from 'react'
import { Grid, Header, Image, Segment, Form, Button, Message } from 'semantic-ui-react'
import { withRouter } from 'react-router-dom'

const sections = [
    {
        key: "IG",
        value: "IG",
        text: "IG"
    },
    {
        key: "MEA",
        value: "MEA",
        text: "MEA"
    },
    {
        key: "MAT",
        value: "MAT",
        text: "MAT"
    },
    {
        key: "MI",
        value: "MI",
        text: "MI"
    },
    {
        key: "GBA",
        value: "GBA",
        text: "GBA"
    }
]

const years = [
    {
        key: "3",
        value: "3",
        text: "3"
    },
    {
        key: "4",
        value: "4",
        text: "4"
    },
    {
        key: "5",
        value: "5",
        text: "5"
    }
]

class LoginForm extends Component {

    constructor(){
        super()
        this.authenticate = this.authenticate.bind(this)
        this.onCheckPolytech = this.onCheckPolytech.bind(this)
        this.state = {
            email: '',
            password: '',
            error: '',
            polytechChecked: false,
            section: sections[0].value,
            year: years[0].value
        }
    }

    async authenticate(){
        try {
            const ldapOptions = this.state.polytechChecked ? {
                ldap: "true",
                section: this.state.section,
                year: this.state.year
            } : null
            this.setState({
                error: null
            })
            await this.props.authenticate(this.state.email, this.state.password, ldapOptions)
            this.props.history.push(this.props.location.redirect || { pathname: '/home' })
        } catch(error) {
            const errorMessage = 
                error.data === "LDAP_SERVER_ERROR" ? "Can't contact LDAP server, connect with regular credentials" :
                error.data === "EMAIL_MALFORMED" ? "Email malformed" :
                error.data === "PASSWORD_EMPTY" ? "The password is required" :
                error.data === "EMAIL_EMPTY" ? 
                    (!this.state.polytechChecked ? "The username or email is required" : "Your name and lastname is required") :
                error.data === "INTERVAL_SERVER_ISSUE" ? (!this.state.polytechChecked ? "Email, username or password is wrong" : "Your name or password is wrong") :
                "Unknown error"
            this.setState({
                error: errorMessage
            })
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

    onCheckPolytech(){
        this.setState({
            polytechChecked: !this.state.polytechChecked
        })
    }

    changeInfoPolytechUser(value){
        this.setState(value)
    }

    render(){
        return (
            <div className='login-form'>
                <Grid textAlign='center' style={{ height: '100%' }} verticalAlign='middle'>
                    <Grid.Column style={{ maxWidth: 450 }}>
                        <Header as='h2' color='teal' textAlign='center'>
                        <p><Image color="teal" className="prello-logo" src='https://image.ibb.co/hoWeaL/Logo-Prello.png' /></p>
                        <Image color="teal" src='http://cdn.onlinewebfonts.com/svg/img_311846.png' /> Log-in to your account
                        </Header>
                        {
                            this.state.error ?
                                
                            <Message color='red' hidden={!this.state.error}>{this.state.error}</Message> : null
                        }
                        <Form size='large'>
                            <Segment stacked>
                                <Form.Group className="polytech-check" widths="equal">
                                    <Form.Checkbox className="polytech" color='teal' checked={ this.state.polytechChecked } onChange={ this.onCheckPolytech } label="Polytech Account" fluid />
                                    {
                                        this.state.polytechChecked ? (
                                            <Form.Group className="field" widths="equal">
                                                <Form.Dropdown className="polytech" defaultValue={sections[0].value} onChange={(event, {value}) => this.changeInfoPolytechUser({ section: value })} options={sections} />
                                                <Form.Dropdown className="polytech" defaultValue={years[0].value} onChange={(event, {value}) => this.changeInfoPolytechUser({ year: value })} options={years} />
                                            </Form.Group>
                                            ) : null
                                    }
                                </Form.Group>
                                <Form.Input fluid icon='user' onChange={(event) => this.changeEmail(event.target.value)} iconPosition='left' placeholder={this.state.polytechChecked ? "firstname.lastname" : "E-mail address"} />
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