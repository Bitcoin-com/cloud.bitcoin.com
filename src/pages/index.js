// @flow

import React from 'react'
import { Link } from 'gatsby'

import DefaultLayout from 'components/layouts/DefaultLayout'
import HelmetPlus from 'components/HelmetPlus'

import Container from 'components/Container'

const IndexPage = ({ location }) => (
  <DefaultLayout location={location}>
    <HelmetPlus title="Cloud platform" />
    <Container>
      <p>Welcome to the Bitcoin.com Cloud Platform.</p>
      <p>Now go build something great.</p>
      <Link to="/dashboard/">To Dashboard</Link>
    </Container>
  </DefaultLayout>
)

export default IndexPage
