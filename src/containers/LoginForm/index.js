import { connect } from 'react-redux'
import LoginForm from '../../components/LoginForm'

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    logIn: (email, password) => {
      dispatch({
        type: 'LOGIN_REQUESTED',
        payload: { email, password }
      })
    }
  }
}

export default connect(null, mapDispatchToProps)(LoginForm)
