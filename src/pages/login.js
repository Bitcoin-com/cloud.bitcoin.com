// @flow

import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import DefaultLayout from 'components/layouts/DefaultLayout'
import HelmetPlus from 'components/HelmetPlus'
import Container from 'components/Container'

const StyledButton = styled.a`
  margin: 10px;
  margin-bottom: 25px;
`

const OutMsg = styled.p`
  color: red;
  font-weight: bold;
  size: 18px;
`

const IndexPage = ({ location }) => (
  <DefaultLayout location={location}>
    <Container>
      <HelmetPlus title="Create User" />
      <h1>Create a User</h1>
      <Link to="/">Go to Home</Link>
    </Container>
  </DefaultLayout>
)

export default IndexPage
