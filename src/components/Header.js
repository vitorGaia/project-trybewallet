import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends Component {
  sumExpenses = () => {
    const { expenses } = this.props;

    const totalValue = expenses.reduce((acc, expense) => {
      const { value, currency, exchangeRates } = expense;

      const exchangeRate = Object
        .entries(exchangeRates).filter((rate) => rate[0] === currency)[0][1].ask;

      const convert = (+value * +exchangeRate);

      return acc + convert;
    }, 0);

    return totalValue;
  };

  render() {
    const { userEmail } = this.props;

    return (
      <header>
        <span data-testid="email-field">{ userEmail }</span>
        <span data-testid="total-field">{ this.sumExpenses().toFixed(2) }</span>
        <span data-testid="header-currency-field">BRL</span>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  expenses: state.wallet.expenses,
});

Header.propTypes = {
  userEmail: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(
    PropTypes.object.isRequired,
  ).isRequired,
};

export default connect(mapStateToProps)(Header);
