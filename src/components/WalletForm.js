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
    /* const { currencies } = this.props;
    console.log(currencies.map((currencie) => console.log(currencie))); */

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

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(WalletForm);
