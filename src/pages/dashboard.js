// @flow

import React from 'react'
import styled from 'styled-components'
import { graphql } from 'gatsby'

import DefaultLayout from 'components/layouts/DefaultLayout'
import Hero from 'components/Hero'
import Container from 'components/Container'
import InfoCard from 'components/InfoCard'
import HelmetPlus from 'components/HelmetPlus'

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

type Props = {
  location: Object,
  data: { heroImage: any }
}

const DevelopPage = ({ location, data }: Props) => (
  <DefaultLayout location={location}>
    <HelmetPlus
      title={`Dashboard - ${data.site.siteMetadata.title}`}
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
    <Hero image={data.heroImage}>
      <HeroLayout>
        <H1 background>Dashboard</H1>
        <H3 primary thin>
          Metrics and account info
        </H3>
      </HeroLayout>
    </Hero>
    <Container>
      <p>My amazing dashboard</p>
      <p>Such dash. Very board. WOW</p>
    </Container>
  </DefaultLayout>
)

export default DevelopPage

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
