import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { auth } from '../../store'
import { Grid, Container, Header, Button, Checkbox, Form } from 'semantic-ui-react'
import { Link, withRouter } from 'react-router-dom'


/**
 * COMPONENT
 */
const AuthForm = props => {
  const { name, displayName, handleSubmit, error, match } = props
  return (
    <Grid centered>
      <Grid.Row centered>
        <Container text>
          <Header>Welcome!</Header>
          <Header as="h3">{match.path === "/login" ? "Login" : "Sign up"}</Header>
        </Container>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column
          mobile={14}
          tablet={12}
          desktop={10}
          textAlign="center"
        >
        <Form onSubmit={ handleSubmit } name={ name }>
        <Form.Field>
          <label htmlFor="email">
            <small>Email</small>
          </label>
          <input name="email" type="text" />
        </Form.Field>
        <Form.Field>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </Form.Field>
        <div>
          <Button type="submit">{match.path === "/login" ? "Login" : "Sign up"}</Button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </Form>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row centered>
        <Grid.Column
          textAlign="center"
        >
        {
          match.path === "/login" ?
          <Fragment>
            <Header as="h4">Need an Account?</Header>
          <Link to="/register">
            <Button>
              Sign up
            </Button>
          </Link>
          </Fragment>
      :
      <Fragment>
      <Header as="h4">Already have an Account?</Header>
            <Link to="/login">
          <Button>
            Login
          </Button>
          </Link>
        </Fragment>
        }
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = state => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = state => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = dispatch => {
  return {
    handleSubmit(evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
