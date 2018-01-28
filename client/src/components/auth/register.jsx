import React, { Component } from 'react'
import { Button, Form, Modal, Message } from 'semantic-ui-react'
import { reduxForm, Field } from 'redux-form'
import { connect } from 'react-redux'
import { Input } from 'semantic-ui-redux-form-fields'
import { registerUserRequest } from '../../actions'

const form = reduxForm({
  form: 'register',
  validate,
  touchOnBlur: false
})

// const renderField = field => (
//   <div>
//     <input className='form-control' {...field.input} />
//     { field.touched && field.error && <div className='error'>{field.error}</div>}
//   </div>
// )

function validate (formProps) {
  console.log('formProps', formProps)
  const errors = {}

  if (!formProps.firstName) {
    errors.firstName = 'Name not supplied'
  }

  if (!formProps.lastName) {
    errors.lastName = 'Last Name not supplied'
  }

  if (!formProps.email) {
    errors.email = 'Email not supplied'
  }

  if (!formProps.password) {
    errors.password = 'Password not supplied'
  }

  // if (Object.keys(errors).length > 0) {
  //   throw new SubmissionError({
  //     ...errors
  //   })
  // }
  return errors
}

const renderField = ({ input, label, type, meta: { touched, error } }) => (
  <div>
    <label>{label}</label>
    <div>
      <input {...input} placeholder={label} type={type} />
      {touched && error &&
      <Message negative>
        <Message.Header>Error</Message.Header>
        <p>{error}</p>
      </Message>}
    </div>
  </div>
)

class Register extends Component {
  constructor (props) {
    super(props)
    this.state = {
      errors: {}
    }
    this.buttonRegister = props.buttonRegister
  }

  handleFormSubmit (formProps) {
    this.props.registerUserRequest(formProps)
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

  // renderFieldPassword = ({fields}) => (
  //   <div>
  //     <input type="number" {...fields} step="0.1" />
  //   </div>
  // )

  render () {
    const { handleSubmit, currentValue, pristine, submitting } = this.props

    return (
      <div>
        <Modal trigger={this.props.buttonRegister}>
          <Modal.Header>Register User</Modal.Header>
          <Modal.Content>
            <Form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
              <Field
                component={renderField}
                currentValue={currentValue}
                type='email'
                name='email'
                placeholder='Insert email here'
                topLabel='Email'
              />
              <Field
                component={Input}
                currentValue={currentValue}
                name='firstName'
                placeholder='Insert first name here'
                topLabel='First Name'
              />
              <Field
                component={Input}
                currentValue={currentValue}
                name='lastName'
                placeholder='Insert last name name here'
                topLabel='Last Name'
              />
              <Field
                component={renderField}
                type='password'
                required='true'
                name='password'
                label='password'
                placeholder='Insert password here'
              />
              <Button type='submit' disabled={pristine || submitting}>Submit</Button>
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

// function mapDispatchToProps () {
//   return {
//     registerUserRequest
//   }
// }

export default connect(mapStateToProps, { registerUserRequest })(form(Register))
