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

  validate (formProps) {
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

    if (Object.keys(errors).length > 0) {
      throw new SubmissionError({
        ...errors
      })
    }
  }

  render () {
    // const { handleSubmit } = this.props
    const { handleSubmit, currentValue, pristine, submitting } = this.props

    return (
      <div>
        <Modal trigger={this.props.buttonRegister}>
          <Modal.Header>Register User</Modal.Header>
          <Modal.Content>
            <Form onSubmit={handleSubmit(this.validate)}>
              <Field
                component={Input}
                currentValue={currentValue}
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
                component={Input}
                currentValue={currentValue}
                name='password'
                placeholder='Insert password here'
                topLabel='Password'
              />
              {/* <Message
                visible={error}
                error
                header='Error'
                content={error}
              /> */}
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
