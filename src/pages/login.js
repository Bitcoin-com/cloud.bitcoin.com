// @flow

import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import DefaultLayout from 'components/layouts/DefaultLayout'
import HelmetPlus from 'components/HelmetPlus'
import Container from 'components/Container'

const StyledButton = styled.button`
  margin: 10px;
  margin-bottom: 25px;
`

const OutMsg = styled.p`
  color: red;
  font-weight: bold;
  size: 18px;
`

const SERVER = `http://localhost:3000/v2/`

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
      <DefaultLayout location={location}>
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

          <Link to="/">Go to Home</Link>
        </Container>
      </DefaultLayout>
    )
  }

  handleUpdate(event) {
    _this.setState({
      [event.target.name]: event.target.value
    })
  }

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

      //console.log(`name: ${users.user.email}`)
      //console.log(`token: ${users.token}`)
      /*
      setUser({
        email: users.user.email,
        jwt: users.token
      })

      navigate(`/app/profile`)
*/
    } catch (err) {
      // If something goes wrong with auth, return false.
      //return false;
      _this.setState(prevState => ({
        message: err.message
      }))
    }
  }

  async loginClick(event) {
    event.preventDefault()

    //_this.setState(prevState => ({
    //  message: "You clicked the Login button."
    //}))

    //console.log(`state: ${JSON.stringify(_this.state,null,2)}`)

    await handleLogin(_this.state)

    navigate(`/app/profile`)
  }
}

export default LoginForm
