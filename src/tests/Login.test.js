import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testes de comportamento do componente loguin', () => {
  test('', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByPlaceholderText(/senha/i);
    const enterBtn = screen.getByRole('button', { name: /entrar/i });

    userEvent.type(emailInput, 'user@email.com');
    userEvent.type(passwordInput, '12345');
    expect(enterBtn).toBeDisabled();

    userEvent.type(passwordInput, '6');
    expect(enterBtn.disabled).toBe(false);
    expect(enterBtn).toHaveTextContent(/entrar/i);

    userEvent.click(enterBtn);
    expect(history.location.pathname).toBe('/carteira');
  });
});
