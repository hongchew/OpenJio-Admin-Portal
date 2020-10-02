import * as types from '../types';

const main = (
  state = {
    adminId: '',
    name: 'guest',
    email: '',
    adminType: '',
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
      };
    case types.LOGOUT: {
      return {
        adminId: '',
        name: '',
        email: '',
        adminType: '',
      };
    }
    default:
      return {...state};
  }
};

export default main;
