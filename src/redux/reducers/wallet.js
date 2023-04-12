import {
  REQUEST_FAILED,
  REQUEST_STARTED,
  REQUEST_SUCCESSFUL,
  SAVE_EXPENSES,
} from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  isFetching: false,
  errorMessage: '',
};

const wallet = (state = INITIAL_STATE, action) => {
  const { type, data } = action;
  switch (type) {
  case REQUEST_STARTED:
    return {
      ...state,
      isFetching: true,
      errorMessage: '',
      currencies: [],
    };

  case REQUEST_SUCCESSFUL:
    return {
      ...state,
      isFetching: false,
      currencies: data,
      errorMessage: '',
    };

  case REQUEST_FAILED:
    return {
      ...state,
      isFetching: false,
      errorMessage: data,
      currencies: [],
    };

  case SAVE_EXPENSES:
    return {
      ...state,
      expenses: [
        ...state.expenses,
        {
          id: state.expenses.length,
          ...data[0],
          exchangeRates: data[1],
        },
      ],
    };

  default:
    return state;
  }
};

export default wallet;
