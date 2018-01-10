import React, { Component } from 'react'
import { Button, Header, Form, Modal, Message } from 'semantic-ui-react'
import { reduxForm } from 'redux-form'
import { connect } from 'react-redux'

const form = reduxForm({
  form: 'register',
  validate
})

// const renderField = field => (
//   <div>
//     <input className='form-control' {...field.input} />
//     { field.touched && field.error && <div className='error'>{field.error}</div>}
//   </div>
// )

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
  constructor (props) {
    super(props)
    this.buttonRegister = props.buttonRegister
  }

  handleFormSubmit (formProps) {
    this.props.registerUser(formProps)
  }

  renderAlert () {
    if (this.props.errorMessage) {
      return (
        <div>
          <span><strong>Error!</strong> {this.props.errorMessage}</span>
        </div>
      )
    }
  }

  render () {
    // const { handleSubmit } = this.props

    return (
      <div>
        <Modal trigger={this.props.buttonRegister}>
          <Modal.Header>Select a Photo</Modal.Header>
          <Modal.Content>
            <Modal.Description>
              <Header>Default Profile Image</Header>
              <p>We've found the following gravatar image associated with your e-mail address.</p>
              <p>Is it okay to use this photo?</p>
            </Modal.Description>
            <Form error>
              <Form.Input label='Email' placeholder='joe@schmoe.com' />
              <Message
                error
                header='Action Forbidden'
                content='You can only sign up for an account once with a given e-mail address.'
              />
              <Button>Submit</Button>
            </Form>
          </Modal.Content>
        </Modal>
      </div>
    )

    // return (
    //   <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
    //   {this.renderAlert()}
    //   <div className='row'>
    //     <div className='col-md-6'>
    //       <label>First Name</label>
    //       <Field name='firstName' className='form-control' component={renderField} type='text' />
    //     </div>
    //     <div className='col-md-6'>
    //       <label>Last Name</label>
    //       <Field name='laststName' className='form-control' component={renderField} type='text' />
    //     </div>
    //     <div className='col-md-6'>
    //       <label>User/Email</label>
    //       <Field name='email' className='form-control' component={renderField} type='text' />
    //     </div>
    //     <div className='col-md-6'>
    //       <label>Password</label>
    //       <Field name='password' className='form-control' component={renderField} type='text' />
    //     </div>
    //     <button type="submit" className="btn btn-primary">Register</button>
    //   </div>
    //   </form>
    // )
  }
}

function mapStateToProps (state) {
  return {
    errorMessage: state.auth.error,
    message: state.auth.message
  }
}

export default connect(mapStateToProps)(form(Register))
