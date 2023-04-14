import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';
import logo from '../images/logo Trybe Wallet.svg';

class Header extends Component {
  sumExpenses = () => {
    const { expenses } = this.props;

    const totalValue = expenses.reduce((acc, expense) => {
      const { value, currency, exchangeRates } = expense;

      const exchangeRate = exchangeRates !== undefined ? Object.entries(exchangeRates)
        .filter((rate) => rate[0] === currency)[0][1].ask : 0;

      const convert = (+value * +exchangeRate);

      return acc + convert;
    }, 0);

    return totalValue;
  };

  render() {
    const { userEmail } = this.props;

    return (
      <header className="header-container">
        <img alt="logo" src={ logo } />
        <span>
          <spam className="font-format">Total de despesas:</spam>
          {` ${this.sumExpenses().toFixed(2)} BRL`}
        </span>
        <span data-testid="email-field">{ userEmail }</span>
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
