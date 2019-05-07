// @flow

import React from 'react'
import { Link } from 'gatsby'

import DefaultLayout from 'components/layouts/DefaultLayout'
import HelmetPlus from 'components/HelmetPlus'
import Container from 'components/Container'

type Props = {
  location: Object
}

const NotFoundPage = ({ location }: Props) => (
  <DefaultLayout location={location}>
    <Container>
      <HelmetPlus location={location} title="404: Page Not found" />
      <h1>NOT FOUND</h1>
      <p>You just hit a route that doesn&#39;t exist...</p>
      <Link to="/">Back to cloud home</Link>
    </Container>
  </DefaultLayout>
)

export default NotFoundPage
