import _get from 'lodash/get';

function dataFromAPIUser(user) {
  if (user) {
    return {
      uid: _get(user, 'uid'),
      email: _get(user, 'email')
    }
  }

  return null;
}

const user = (
  state = {
    isPending: false,
    isError: false,
    data: null
  },
  action
) => {
  switch (action.type) {
    case 'INITIALIZE_USER':
      return {
        ...state,
        data: dataFromAPIUser(action.user)
      }

    case 'LOGIN_REQUEST':
      return {
        ...state,
        isPending: true
      };

    case 'LOGIN_SUCCEEDED':
      return {
        ...state,
        isPending: false,
        isError: false,
        data: dataFromAPIUser(action.user)
      };

    case 'LOGIN_FAILED':
      return {
        ...state,
        isError  : false,
        isPending: false,
        data: null
      };

    default:
      return state;
  }
}

export default user;
