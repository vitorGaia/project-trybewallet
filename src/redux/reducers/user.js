const INITIAL_STATE = {
  email: '',
};

const user = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
  case 'USER_LOGIN':
    return {
      ...state,
      email: data,
    };

  default:
    return state;
  }
};

export default user;
