import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteExpense } from '../redux/actions';

class Table extends Component {
  render() {
    const { expenses, dispatch } = this.props;

    const mapExpensesTable = expenses.map((expense) => {
      const { exchangeRates } = expense;

      const { name, ask } = Object.values(exchangeRates)
        .filter((rate) => rate.code === expense.currency)[0];

      const convertedValue = (+expense.value * +ask).toFixed(2);

      return (
        <tr key={ expense.id }>
          <td>{expense.description}</td>
          <td>{expense.tag}</td>
          <td>{expense.method}</td>
          <td>{(+expense.value).toFixed(2)}</td>
          <td>{name}</td>
          <td>{(+ask).toFixed(2)}</td>
          <td>{convertedValue}</td>
          <td>Real</td>
          <td>
            <button>Editar</button>
            <button
              data-testid="delete-btn"
              onClick={ () => dispatch(deleteExpense(expense.id)) }
            >
              Deletar
            </button>
          </td>
        </tr>
      );
    });

    const estilo = {
      backgroundColor: '#DDFFBB',
      color: 'black',
    };

    return (
      <table style={ estilo }>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          {mapExpensesTable}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(Table);
