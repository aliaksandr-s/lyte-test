import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { inject, observer } from 'mobx-react';

const loginStyles = {
  height: '80vh'
}

const wrapperStyles = {
  maxWidth: 450,
}

const LoginForm = ({ handleLogin, loginErrors, authErrors, isLoading }) => (
  <Grid textAlign='center' style={loginStyles} verticalAlign='middle'>
    <Grid.Column style={wrapperStyles}>
      <Header as='h2' color='teal' textAlign='center'>
        Log-in to your account
      </Header>
      <Form size='large' onSubmit={handleLogin}>
        {
          authErrors.non_field_errors &&
          <Message
            negative
            header='There was some errors with your submission'
            list={authErrors.non_field_errors}
          />
        }
        <Segment stacked>
          <Form.Field>
            <Form.Input
              required
              fluid
              error={!!authErrors.username && authErrors.username[0]}
              icon='user'
              iconPosition='left'
              placeholder='E-mail or username'
              name='username'
            />
          </Form.Field>

          <Form.Input
            required
            fluid
            error={!!authErrors.password && authErrors.password[0]}
            icon='lock'
            iconPosition='left'
            placeholder='Password'
            type='password'
            name='password'
          />

          <Button color='teal' fluid size='large' loading={isLoading}>
            Login
          </Button>
        </Segment>
      </Form>
      <Message>
        New to us? <a href='/register'>Register</a>
      </Message>
    </Grid.Column>
  </Grid>
)

@inject('AuthStore')
@withRouter
@observer
class LoginContainer extends Component {
  handleLogin = (e) => {
    e.preventDefault();
    const username = e.target.username.value;
    const password = e.target.password.value;

    this.props.AuthStore.authenticateUser(username, password);
  }

  redirectToMainIfAuthenticated = (isAuthenticated) => {
    if (isAuthenticated) this.props.history.push('/events');
  }

  componentDidMount() {
    this.redirectToMainIfAuthenticated(this.props.AuthStore.isAuthenticated)
  }

  componentDidUpdate() {
    this.redirectToMainIfAuthenticated(this.props.AuthStore.isAuthenticated)
  }

  render() {
    const {
      isLoading,
      authErrors,
    } = this.props.AuthStore;

    return (
      <LoginForm
        isLoading={isLoading}
        authErrors={authErrors}
        handleLogin={this.handleLogin}
      />
    )
  }
}

export default LoginContainer