import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Table extends Component {
  render() {
    const { expenses } = this.props;

    const mapExpensesTable = expenses.map((expense, index) => {
      const { exchangeRates } = expense;

      const { name, ask } = Object.values(exchangeRates)
        .filter((rate) => rate.code === expense.currency)[0];

      const convertedValue = (+expense.value * +ask).toFixed(2);

      return (
        <tr key={ index + 1 }>
          <td>{expense.description}</td>
          <td>{expense.tag}</td>
          <td>{expense.method}</td>
          <td>{(+expense.value).toFixed(2)}</td>
          <td>{name}</td>
          <td>{(+ask).toFixed(2)}</td>
          <td>{convertedValue}</td>
          <td>Real</td>
          <td><button>Edit/Delete</button></td>
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
  expenses: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(Table);
