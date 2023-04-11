import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchCurrencies } from '../redux/actions';

class WalletForm extends Component {
  componentDidMount() {
    const { currencies, dispatch } = this.props;
    dispatch(fetchCurrencies());
  }

  render() {
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

      </form>
    );
  }
}

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  isFetching: state.wallet.isFetching,
});

export default connect(mapStateToProps)(WalletForm);
