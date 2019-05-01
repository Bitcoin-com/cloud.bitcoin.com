// @flow

import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import DefaultLayout from 'components/layouts/DefaultLayout'
import HelmetPlus from 'components/HelmetPlus'
import Container from 'components/Container'
import LoginCashId from 'components/cashid'
//import CashId from 'react-cashid';

const StyledButton = styled.button`
  margin: 10px;
  margin-bottom: 25px;
`

const OutMsg = styled.p`
  color: red;
  font-weight: bold;
  size: 18px;
`

//const SERVER = `http://localhost:3000/v2/`
const SERVER = `/v2/`

let _this

class LoginForm extends React.Component {
  constructor(props) {
    super(props)

    _this = this

    this.state = {
      message: '',
      email: '',
      password: ''
    }
  }

  render() {
    return (
      <DefaultLayout location={this.props.location}>
        <Container>
          <HelmetPlus title="Create User" />
          <h1>Create a User</h1>

          <form>
            Login:
            <br />
            <input type="text" name="email" onChange={this.handleUpdate} />
            <br />
            Password:
            <br />
            <input
              type="password"
              name="password"
              onChange={this.handleUpdate}
            />
            <br />
            <StyledButton
              href="#"
              id="createBtn"
              onClick={this.createClick}
              data-to="bitcoincash:qzl6k0wvdd5ky99hewghqdgfj2jhcpqnfq8xtct0al"
            >
              Create
            </StyledButton>
            <StyledButton
              href="#"
              id="loginBtn"
              onClick={this.loginClick}
              data-to="bitcoincash:qzl6k0wvdd5ky99hewghqdgfj2jhcpqnfq8xtct0al"
            >
              Login
            </StyledButton>
            <br />
            <OutMsg>{this.state.message}</OutMsg>
          </form>

          <br />

          <LoginCashId
            domain="rest.bchtest.net"
            path="/v2/user/cashid"
            action="login"
            color="orange"
            qr={false}
            callback={this.cashIdSuccess}
          />

          <br />

          <Link to="/">Go to Home</Link>
        </Container>
      </DefaultLayout>
    )
  }

  // This callback is executed when the CashID login completes successfully.
  cashIdSuccess(data) {
    console.log(`cashIdSuccess data: ${JSON.stringify(data, null, 2)}`)
  }

  // Updates the email and password as the user types.
  handleUpdate(event) {
    _this.setState({
      [event.target.name]: event.target.value
    })
  }

  // User clicked on the 'Create' button.
  async createClick(event) {
    event.preventDefault()

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            email: _this.state.email,
            password: _this.state.password
          }
        })
      }

      const data = await fetch(`${SERVER}user/`, options)
      const result = await data.json()
      //console.log(`result: ${JSON.stringify(result, null, 2)}`)

      if (result.success)
        _this.setState(prevState => ({
          message: `User successfully created!`
        }))
      else {
        _this.setState(prevState => ({
          message: `User creation failed. Check console for details.`
        }))
        console.log(`result: ${JSON.stringify(result, null, 2)}`)
      }
    } catch (err) {
      // Update the message on the web page with the error message.
      _this.setState(prevState => ({
        message: err.message
      }))
    }
  }

  // User clicked on the 'Login' button.
  async loginClick(event) {
    event.preventDefault()

    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          user: {
            email: _this.state.email,
            password: _this.state.password
          }
        })
      }

      const data = await fetch(`${SERVER}user/login`, options)
      const result = await data.json()
      console.log(`result: ${JSON.stringify(result, null, 2)}`)

      const token = result.user.token

      // Display token on screen.
      if (token) {
        _this.setState(prevState => ({
          message: token
        }))

        // Otherwise, Clear the message display.
      } else {
        _this.setState(prevState => ({
          message: ''
        }))
      }
    } catch (err) {
      // Update the message on the web page with the error message.
      _this.setState(prevState => ({
        message: err.message
      }))
    }

    //_this.setState(prevState => ({
    //  message: "You clicked the Login button."
    //}))

    //console.log(`state: ${JSON.stringify(_this.state,null,2)}`)

    //navigate(`/app/profile`)
  }
}

export default LoginForm

/*
<LoginCashId
  domain="rest.bchtest.net"
  path="/v2/user/cashid"
  action="login"
  color="orange"
  qr="false"
/>
*/

/*
<CashId
  domain="rest.bchtest.net"
  path="/v2/user/cashid"
  action="login"
  color="orange"
  qr={false}
  callback={function() {console.log(`test est test`)}}
/>
*/
