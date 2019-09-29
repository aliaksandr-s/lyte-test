import React from 'react'
import {
  Container,
} from 'semantic-ui-react'
import Navbar from '../Navbar';

const childrenContainerStyles = {
  marginTop: '2rem'
}

const FixedMenuLayout = ({ children }) => (
  <div>
    <Navbar />
    <Container text style={childrenContainerStyles}>
      {children}
    </Container>
  </div>
)

export default FixedMenuLayout