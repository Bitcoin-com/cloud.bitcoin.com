// @flow

import React from 'react'
import styled from 'styled-components'
import { Link } from 'gatsby'

import Container from 'components/Container'
import spacing from 'styles/spacing'

import { textBase } from 'atoms/Text'

const Main = styled.div`
  position: sticky;
  top: 0;
  background-color: ${props => props.theme.foreground900};
  z-index: 999;
  padding: ${spacing.small2};
`

const NavLayout = styled.div`
  display: flex;
  flex-direction: row;
`

const NavItem = styled(Link)`
  ${textBase};
  color: ${props =>
    props.isActive ? props.theme.primary500 : props.theme.background100};
  text-decoration: none;
  margin-right: ${spacing.medium};
  &:hover {
    color: ${props => props.theme.primary600};
  }
`

type Props = {
  pathname: string
}

const dashboardBaseUrls = ['/dashboard']

class NavBar extends React.PureComponent<Props> {
  render() {
    const { pathname } = this.props

    // final `//` is for SSR as it adds an extra `/` to path names
    const homeActive = pathname === '/' || pathname === '' || pathname === '//'
    const dashboardActive = dashboardBaseUrls.reduce(
      (prev, curr) => prev || pathname.includes(curr),
      false
    )

    return (
      <Main>
        <Container>
          <NavLayout>
            <NavItem monospace="true" to="/" isActive={homeActive}>
              Home
            </NavItem>
            <NavItem
              monospace="true"
              to="/dashboard"
              isActive={dashboardActive}
            >
              Dashboard
            </NavItem>
          </NavLayout>
        </Container>
      </Main>
    )
  }
}

export default NavBar
