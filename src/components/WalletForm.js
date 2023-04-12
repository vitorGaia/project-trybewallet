import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCotations, fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  state = {
    value: '',
    description: '',
    currency: 'USD',
    method: 'Dinheiro',
    tag: 'Alimentação',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  handleChange = ({ target }) => this.setState({ [target.name]: target.value });

  handleClick = () => {
    const { dispatch } = this.props;
    dispatch(fetchCotations(this.state));
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies } = this.props;
    const { value, description, currency, method, tag } = this.state;

    const mapCurrencies = currencies.map((currencyOpt, index) => (
      <option key={ index + 1 }>{currencyOpt}</option>
    ));

    const methodOptions = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const mapMethods = methodOptions.map((methodOpt, index) => (
      <option key={ index + 1 }>{methodOpt}</option>
    ));

    const categorieOptions = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    const mapCategories = categorieOptions.map((cagoryOpt, index) => (
      <option key={ index + 1 }>{cagoryOpt}</option>
    ));

    return (
      <form>

        <label>
          Valor
          <input
            type="number"
            data-testid="value-input"
            name="value"
            value={ value }
            onChange={ this.handleChange }
          />
        </label>

        <label>
          Descrição
          <input
            type="text"
            data-testid="description-input"
            name="description"
            value={ description }
            onChange={ this.handleChange }
          />
        </label>

        <label>
          Moeda
          <select
            data-testid="currency-input"
            onChange={ this.handleChange }
            name="currency"
            value={ currency }
          >
            {mapCurrencies}
          </select>
        </label>

        <label>
          Métodos de pagamento
          <select
            data-testid="method-input"
            onChange={ this.handleChange }
            name="method"
            value={ method }
          >
            {mapMethods}
          </select>
        </label>

        <label>
          Categoria
          <select
            data-testid="tag-input"
            onChange={ this.handleChange }
            name="tag"
            value={ tag }
          >
            {mapCategories}
          </select>
        </label>

        <button
          type="button"
          onClick={ this.handleClick }
        >
          Adicionar despesa
        </button>

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
