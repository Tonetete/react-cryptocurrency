import React from 'react'
import { Button, Header, Image, Modal } from 'semantic-ui-react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const form = reduxForm({
  form: 'register',
  validate
})

const renderField = field => (
  <div>
    <input className='form-control' {...field.input} />
    { field.touched && field.error && <div className='error'>{field.error}</div>}
  </div>
)

function validate (formProps) {
  const errors = {}

  if (!formProps.firstName) {
    errors.firstName = 'Please enter a first name'
  }

  if (!formProps.lastName) {
    errors.lastName = 'Please enter a last name'
  }

  if (!formProps.email) {
    errors.email = 'Please enter a email/user'
  }

  if (!formProps.password) {
    errors.password = 'Please enter a password'
  }
  return errors
}

class Register extends Component {
  handleFormSubmit (formProps) {
    this.props.registerUser(formProps)
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage)}</span>
        </div>
      )
    }
  }

  render () {
    const { handleSubmit } = this.props

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
      {this.renderAlert()}
      <div className='row'>
        <div className='col-md-6'>
          <label>First Name</label>
          <Field name='firstName' className='form-control' component={renderField} type='text' />
        </div>
        <div className='col-md-6'>
          <label>Last Name</label>
          <Field name='laststName' className='form-control' component={renderField} type='text' />
        </div>
        <div className='col-md-6'>
          <label>User/Email</label>
          <Field name='email' className='form-control' component={renderField} type='text' />
        </div>
        <div className='col-md-6'>
          <label>Password</label>
          <Field name='password' className='form-control' component={renderField} type='text' />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
      </div>
      </form>
    )
  }
}

function mapStateToProps (state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  }
}

export default connect(mapStateToProps, { registerUser })(form(Register))
