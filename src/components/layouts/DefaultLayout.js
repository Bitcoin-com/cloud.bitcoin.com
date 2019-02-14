// @flow

import * as React from 'react'
import styled, { ThemeProvider } from 'styled-components'
import { StaticQuery, graphql } from 'gatsby'

import { defaultTheme } from 'styles/themes'
import './base.css'

import HelmetPlus from 'components/HelmetPlus'
import NavBar from 'components/NavBar'

import Favicon from 'images/favicon.png'

type Props = {
  children: React.Node,
  location: Object
}

type Data = {
  site: { siteMetadata: { title: string } }
}

const Main = styled.div`
  position: relative;
  min-height: 85vh;
`

const DefaultLayout = ({ children, location }: Props) => (
  <StaticQuery
    query={graphql`
      query SiteTitleQuery {
        site {
          siteMetadata {
            title
          }
        }
      }
    `}
    render={(data: Data) => (
      <>
        <HelmetPlus
          title={data.site.siteMetadata.title}
          description={
            'Cloud platform for all your Bitcoin Cash (BCH) development needs.'
          }
          keywords={[
            'developer tools',
            'bitcoin',
            'bitcoin cash',
            'BCH',
            'development tools',
            'cloud platform'
          ]}
          location={location}
          image={Favicon}
        >
          <meta charSet="utf-8" />
          <script>
            var BitcoinMenuWidth = 1152; var BitcoinMenuLang = 'en';
          </script>
          <script
            type="text/javascript"
            src="https://menu.cdn.bitcoindotcom.net/the-footer/dist/universal-footer.js"
          />
          <script src="https://menu.cdn.bitcoindotcom.net/the-menu/dist/universal-menu.js" />
        </HelmetPlus>
        <ThemeProvider theme={defaultTheme}>
          <Main>
            <NavBar pathname={location ? location.pathname : ''} />
            {children}
            {/* <ShareFooter location={location} /> */}
          </Main>
        </ThemeProvider>
      </>
    )}
  />
)

export default DefaultLayout
