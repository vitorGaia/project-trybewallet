import React from 'react';
import Header from '../components/Header';
import WalletForm from '../components/WalletForm';
import Table from '../components/Table';
import './Wallet.css';

class Wallet extends React.Component {
  render() {
    return (
      <main className="wallet-page-container">
        <div className="header-form-container">
          <Header />
          <WalletForm />
        </div>
        <div className="table-container">
          <Table />
        </div>
      </main>
    );
  }
}

export default Wallet;
