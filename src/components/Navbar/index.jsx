import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {
  Container,
  Menu,
} from 'semantic-ui-react'

import { inject, observer } from 'mobx-react';

const menuStyles = {
  position: 'sticky',
  top: '0',
  zIndex: '99999'
}

const Navbar = ({ isAuthenticated, logoutHandler }) => (
  <Menu style={menuStyles} size='massive'>
    <Container>
      <Menu.Item as='a' href='/' header>
        Evently
      </Menu.Item>

      <Menu.Menu position='right'>
        {
          !isAuthenticated &&
          <Menu.Item as='a' href='/login'>
            Log in
          </Menu.Item>
        }
        {
          isAuthenticated &&
          <Menu.Item as='a' href='/admin'>
            Admin Pannel
          </Menu.Item>
        }
        {
          isAuthenticated &&
          <Menu.Item onClick={() => logoutHandler()}>
            Logout
          </Menu.Item>
        }
      </Menu.Menu>
    </Container>
  </Menu>
)

@inject('AuthStore')
@observer
class NavbarContainer extends Component {
  render() {
    const {
      isAuthenticated,
      logout,
    } = this.props.AuthStore;

    return (
      <Navbar
        isAuthenticated={isAuthenticated}
        logoutHandler={logout}
      />
    )
  }
}

Navbar.propTypes = {
  isAuthenticated: PropTypes.bool.isRequired,
  logoutHandler: PropTypes.func.isRequired
}

export default NavbarContainer;