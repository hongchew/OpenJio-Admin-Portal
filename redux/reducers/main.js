import * as types from '../types';

const main = (
  state = {
    adminId: '',
    name: 'guest',
    email: '',
    adminType: '',
    password: '',
  },
  action
) => {
  switch (action.type) {
    case types.SET_USER:
      return {
        adminId: action.payload.adminId,
        name: action.payload.name,
        email: action.payload.email,
        adminType: action.payload.adminType,
        password: action.payload.password,
      };
    case types.LOGOUT: {
      return {
        adminId: '',
        name: 'guest',
        email: '',
        adminType: '',
        password: '',
      };
    }
    default:
      return {...state};
  }
};

export default main;
