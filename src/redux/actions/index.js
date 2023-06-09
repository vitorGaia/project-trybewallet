export const USER_LOGIN = 'USER_LOGIN';
export const REQUEST_STARTED = 'REQUEST_STARTED';
export const REQUEST_SUCCESSFUL = 'REQUEST_SUCCESSFUL';
export const REQUEST_FAILED = 'REQUEST_FAILED';
export const SAVE_EXPENSES = 'SAVE_EXPENSES';
export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const ACTIVATE_EDIT_MODE = 'ACTIVATE_EDIT_MODE';
export const SAVE_EDIT = 'SAVE_EDIT';

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
    const brlData = { BRL: {
      ask: '1',
      code: 'BRL',
      name: 'Real Oficial',
    },
    ...data };
    dispatch(requestSuccessful(brlData));
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
    const brlData = { BRL: {
      ask: '1',
      code: 'BRL',
      name: 'Real Oficial',
    },
    ...data };
    dispatch(saveExpenses(expense, brlData));
  } catch (error) {
    dispatch(requestFailed(error));
  }
};

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  data: id,
});

export const activateEditMode = (idToEdit) => ({
  type: ACTIVATE_EDIT_MODE,
  data: idToEdit,
});

export const saveEdit = (editor) => ({
  type: SAVE_EDIT,
  data: editor,
});
