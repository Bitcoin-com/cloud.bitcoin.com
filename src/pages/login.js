// @flow

import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import DefaultLayout from 'components/layouts/DefaultLayout'
import Hero from 'components/Hero'
import Container from 'components/Container'
import InfoCard from 'components/InfoCard'
import HelmetPlus from 'components/HelmetPlus'
import LoginCashId from 'components/cashid'

import H3 from 'atoms/H3'
import H1 from 'atoms/H1'

import media from 'styles/media'
import spacing from 'styles/spacing'

const HeroLayout = styled.div`
  display: grid;
  grid-gap: ${spacing.tiny};
`

const CardLayout = styled.div`
  display: grid;
  padding-top: ${spacing.large};
  grid-gap: ${spacing.medium};
  grid-template-columns: 1fr;
  ${media.medium`
    grid-template-columns: repeat(auto-fit, minmax(400px, .5fr));
  `};
`

const StyledButton = styled.button`
  margin: 10px;
  margin-bottom: 25px;
`

const OutMsg = styled.p`
  color: red;
  font-weight: bold;
  size: 18px;
`

type Props = {
  location: Object,
  data: { heroImage: any }
}

const SERVER = `http://localhost:3000/v1/`
//const SERVER = `/v2/`

function cashIdSuccess(data) {
  console.log(`cashIdSuccess data: ${JSON.stringify(data, null, 2)}`)
}

let _this // Used when 'this' loses scope.

class LoginPage extends React.Component {
  //= ({ location, data }: Props) => (
  constructor(props) {
    super(props)

    //console.log(`props: ${JSON.stringify(props,null,2)}`)

    _this = this

    this.state = {
      message: '',
      email: '',
      password: ''
    }

    this.location = props.location
    this.data = props.data
  }

  render() {
    return (
      <DefaultLayout location={location}>
        <HelmetPlus
          title={`Login - ${this.data.site.siteMetadata.title}`}
          description={
            'Development hub for all your development needs to be successful on Bitcoin Cash (BCH)'
          }
          keywords={[
            'develop on bitcoin',
            'develop on bitcoin cash',
            'bitcoin cash resources'
          ]}
          location={location}
        />
        <Hero image={this.data.heroImage}>
          <HeroLayout>
            <H1 background>Login</H1>
            <H3 primary thin>
              Register and login
            </H3>
          </HeroLayout>
        </Hero>
        <Container>
          <h1>Create a User</h1>
          <LoginCashId
            domain="rest.bchtest.net"
            path="/v2/user/cashid"
            action="login"
            color="orange"
            qr={false}
            callback={cashIdSuccess}
          />

          <br />
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

    console.log(`_this.state: ${JSON.stringify(_this.state, null, 2)}`)

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

      const svrData = await fetch(`${SERVER}user/`, options)
      const result = await svrData.json()
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

      const svrData = await fetch(`${SERVER}user/login`, options)
      const result = await svrData.json()
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
  }
}

export default LoginPage

export const query = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    heroImage: file(relativePath: { eq: "hero-develop.jpg" }) {
      childImageSharp {
        fluid(
          duotone: { highlight: "#f9b016", shadow: "#191919" }
          maxWidth: 2000
          quality: 85
        ) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
