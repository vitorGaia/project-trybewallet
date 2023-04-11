const INITIAL_STATE = {
  currencies: [],
  isFetching: false,
  errorMessage: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
  case 'REQUEST_STARTED':
    return {
      ...state,
      isFetching: true,
      errorMessage: '',
      currencies: [],
    };

  case 'REQUEST_SUCCESSFUL':
    return {
      ...state,
      isFetching: false,
      currencies: data,
      errorMessage: '',
    };

  case 'REQUEST_FAILED':
    return {
      ...state,
      isFetching: false,
      errorMessage: data,
      currencies: [],
    };
  default:
    return state;
  }
};

export default wallet;
