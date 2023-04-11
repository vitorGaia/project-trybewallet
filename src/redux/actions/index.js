export const USER_LOGIN = 'USER_LOGIN';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';

export const userLogin = (email) => ({
  type: USER_LOGIN,
  data: email,
});

const requestStarted = () => ({
  type: REQUEST_STARTED,
});

const requestSuccessful = (currencies) => ({
  type: REQUEST_SUCCESSFUL,
  data: currencies,
});

const requestFailed = (error) => ({
  type: REQUEST_FAILED,
  data: error,
});

export const fetchCurrencies = () => async (dispatch) => {
  try {
    dispatch(requestStarted());
    const data = await (await fetch('https://economia.awesomeapi.com.br/json/all')).json();
    console.log(data);
    dispatch(requestSuccessful(data.currencies));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};
