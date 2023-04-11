import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { userLogin } from '../redux/actions';

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    disableBtn: true,
  };

  handleChange = ({ target }) => this
    .setState({ [target.name]: target.value }, this.handleVerifies);

  handleVerifies = () => {
    const { email, password } = this.state;
    const minLength = 6;
    const regexEmail = /\S+@\S+\.\S+/;

    if (regexEmail.test(email)
    && password.length >= minLength
    && email !== '') {
      this.setState({ disableBtn: false });
    } else {
      this.setState({ disableBtn: true });
    }
  };

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(userLogin(email));
    history.push('/carteira');
  };

  render() {
    const { email, password, disableBtn } = this.state;
    return (
      <div>
        <form>
          <input
            type="email"
            data-testid="email-input"
            onChange={ this.handleChange }
            name="email"
            value={ email }
            placeholder="Email"
          />

          <input
            type="password"
            data-testid="password-input"
            min="5"
            onChange={ this.handleChange }
            name="password"
            value={ password }
            placeholder="Senha"
          />

          <button
            disabled={ disableBtn }
            onClick={ this.handleClick }
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
