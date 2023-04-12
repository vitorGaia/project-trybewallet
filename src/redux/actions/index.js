export const USER_LOGIN = 'USER_LOGIN';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  data: email,
});

const requestStarted = () => ({
  type: REQUEST_STARTED,
});

const requestFailed = (error) => ({
  type: REQUEST_FAILED,
  data: error,
});

const requestSuccessful = (currencies) => ({
  type: REQUEST_SUCCESSFUL,
  data: Object.keys(currencies),
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    dispatch(requestStarted());
    const data = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
    delete data.USDT;
    dispatch(requestSuccessful(data));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

const saveExpenses = (expense, data) => ({
  type: SAVE_EXPENSES,
  data: [expense, data],
});

export const fetchCotations = (expense) => async (dispatch) => {
  try {
    const data = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
    delete data.USDT;
    dispatch(saveExpenses(expense, data));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};
