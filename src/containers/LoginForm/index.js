import { connect } from 'react-redux'
import LoginForm from '../../componentns/LoginForm'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logIn: (email, password) => {
      dispatch({
        type: 'LOGIN_REQUESTED',
        payload: { email, password }
      })
      console.log(`Logging in ${email}:${password}`)
    }
  }
}

export default connect(null, mapDispatchToProps)(LoginForm)
