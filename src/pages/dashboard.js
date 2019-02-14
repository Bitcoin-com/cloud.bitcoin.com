// @flow

import React from 'react'
import { Link } from 'gatsby'

import DefaultLayout from 'components/layouts/DefaultLayout'
import HelmetPlus from 'components/HelmetPlus'
import Container from 'components/Container'

const IndexPage = ({ location }) => (
  <DefaultLayout location={location}>
    <Container>
      <HelmetPlus title="Cloud Dashboard" />
      <h1>Dashboard</h1>
      <Link to="/">Go to Home</Link>
    </Container>
  </DefaultLayout>
)

export default IndexPage
