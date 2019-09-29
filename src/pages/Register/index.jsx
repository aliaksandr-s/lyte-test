import React, { Component } from 'react'
import { Button, Form, Grid, Header, Message, Segment } from 'semantic-ui-react'

import { inject, observer } from 'mobx-react';

const registerStyles = {
  height: '80vh'
}

const wrapperStyles = {
  maxWidth: 450,
}

const RegisterForm = ({
  isLoading,
  registerErrors,
  handleRegister,
  isRegisterSuccess
}) => (
    <Grid textAlign='center' style={registerStyles} verticalAlign='middle'>
      <Grid.Column style={wrapperStyles}>
        <Header as='h2' color='blue' textAlign='center'>
          Create a new account
      </Header>

        <Form size='large' onSubmit={handleRegister}>
          <Segment stacked>
            <Form.Field>
              <Form.Input
                required
                fluid
                error={!!registerErrors.email && registerErrors.email[0]}
                icon='user'
                iconPosition='left'
                placeholder='E-mail address'
                name='email'
                id='email'
              />
            </Form.Field>

            <Form.Input
              required
              fluid
              error={!!registerErrors.password && (registerErrors.password[0] || registerErrors.password.password[0])} // FIXME: probably there is a bug in the api. Error interface should be consistent
              icon='lock'
              iconPosition='left'
              placeholder='Password'
              type='password'
              name='password'
            />

            <Button color='blue' fluid size='large' loading={isLoading}>
              Register
            </Button>
          </Segment>
        </Form>

        {!isRegisterSuccess &&
          <Message>
            Already a user? <a href='/login'>Log in</a>
          </Message>
        }

        {isRegisterSuccess &&
          <Message success>
            Successfully registered! <a href='/login'>Log in</a>
          </Message>
        }

      </Grid.Column>
    </Grid>
  )

@inject('AuthStore')
@observer
class RegisterContainer extends Component {
  handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    this.props.AuthStore.registerUser(email, password);
  }

  render() {
    const {
      isLoading,
      registerErrors,
      isRegisterSuccess,
    } = this.props.AuthStore;

    return (
      <RegisterForm
        isLoading={isLoading}
        isRegisterSuccess={isRegisterSuccess}
        registerErrors={registerErrors}
        handleRegister={this.handleRegister}
      />
    )
  }
}

export default RegisterContainer;