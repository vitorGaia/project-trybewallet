import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fetchCotations, fetchCurrencies, saveEdit } from '../redux/actions';
import './WalletForm.css';

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
    const { dispatch, editor } = this.props;
    if (!editor) {
      dispatch(fetchCotations(this.state));
    } else {
      dispatch(saveEdit(this.state));
    }
    this.setState({
      value: '',
      description: '',
    });
  };

  render() {
    const { currencies, editor } = this.props;
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
      <form className="form-header-container">

        <div className="form-wallet-container">
          <div>
            <label>
              Descrição da despesa
              <input
                type="text"
                data-testid="description-input"
                name="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>

            <label>
              Categoria da despesa
              <select
                data-testid="tag-input"
                onChange={ this.handleChange }
                name="tag"
                value={ tag }
              >
                {mapCategories}
              </select>
            </label>
          </div>

          <div>
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
          </div>
        </div>

        <div className="button-container">
          <button
            type="button"
            onClick={ this.handleClick }
          >
            {editor ? 'Editar despesa' : 'Adicionar despesa'}
          </button>
        </div>

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
  editor: state.wallet.editor,
  idToEdit: state.wallet.idToEdit,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  editor: PropTypes.bool.isRequired,
  currencies: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(WalletForm);
