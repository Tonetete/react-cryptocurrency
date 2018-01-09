import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { checkServerStatus } from '../../actions/index'

export default function (ComposedComponent) {
  class Authentication extends Component {
        static contextTypes = {
          router: PropTypes.object
        }

        constructor (props) {
          super(props)
          this.state = { ...props }
          this.props.checkServerStatus()
        }

        componentWillMount () {
          if (!this.props.authenticated || !this.props.serverStatus) {
            this.context.router.history.push('/login')
          }
        }

        componentWillUpdate (nextProps) {
          if (!nextProps.authenticated || !nextProps.serverStatus) {
            this.context.router.history.push('/login')
          }
        }

        render () {
          return <ComposedComponent {...this.props} />
        }
  }

  function mapStateToProps (state) {
    return {
      authenticated: state.auth.authenticated,
      serverStatus: state.auth.serverStatus
    }
  }

  return connect(mapStateToProps, { checkServerStatus })(Authentication)
}
