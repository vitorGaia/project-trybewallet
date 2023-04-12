import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
    const { currencies } = this.props;

    const mapCurrencies = currencies.map((currencie, index) => (
      <option key={ index + 1 }>{currencie}</option>
    ));

    const methodOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const mapMethods = methodOptions.map((method, index) => (
      <option key={ index + 1 }>{method}</option>
    ));

    const categorieOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const mapCategories = categorieOptions.map((cagorie, index) => (
      <option key={ index + 1 }>{cagorie}</option>
    ));

    return (
      <form>

        <label>
          Valor
          <input
            type="number"
            data-testid="value-input"
          />
        </label>

        <label>
          Descrição
          <input
            type="text"
            data-testid="description-input"
          />
        </label>

        <label>
          Moeda
          <select data-testid="currency-input">
            {mapCurrencies}
          </select>
        </label>

        <label>
          Métodos de pagamento
          <select data-testid="method-input">
            {mapMethods}
          </select>
        </label>

        <label>
          Categoria
          <select data-testid="tag-input">
            {mapCategories}
          </select>
        </label>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
