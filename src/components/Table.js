import React, { Component } from 'react';

class Table extends Component {
  render() {
    const estilo = {
      backgroundColor: '#DDFFBB',
      color: 'black',
    };
    return (
      <table style={ estilo }>
        <th>Descrição</th>
        <th>Tag</th>
        <th>Método de pagamento</th>
        <th>Valor</th>
        <th>Moeda</th>
        <th>Câmbio utilizado</th>
        <th>Valor convertido</th>
        <th>Moeda de conversão</th>
        <th>Editar/Excluir</th>
      </table>
    );
  }
}

export default Table;
