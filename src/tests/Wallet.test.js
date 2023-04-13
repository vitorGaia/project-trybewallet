import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
/* import Wallet from '../pages/Wallet'; */
import mockData from './helpers/mockData';
import App from '../App';

describe('Testes da pagina Wallet', () => {
  test('Header', async () => {
    jest.spyOn(global, 'fetch');
    global.fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    renderWithRouterAndRedux(<App />, { initialEntries: ['/carteira'] });

    expect(screen.getByText(/0\.00/i)).toBeInTheDocument();
    expect(screen.getByText(/brl/i)).toBeInTheDocument();

    const inputValue = screen.getByRole('spinbutton', { name: /valor/i });
    const inputDescription = screen.getByRole('spinbutton', { name: /valor/i });
    const addExpeseButton = screen.getByRole('button', { name: /adicionar despesa/i });

    userEvent.type(inputValue, '10');
    userEvent.type(inputDescription, 'lau');
    userEvent.click(addExpeseButton);

    expect(global.fetch).toHaveBeenCalledTimes(2);
    const display = await screen.findAllByText(/47\.53/i);
    expect(display[0]).toBeInTheDocument();

    const editBtn = screen.getByRole('button', { name: /editar/i });
    userEvent.click(editBtn);

    userEvent.type(inputValue, '4.20');
    userEvent.type(inputDescription, 'makonha');

    const confimEditBtn = screen.getByRole('button', { name: /editar despesa/i });
    userEvent.click(confimEditBtn);

    expect(screen.queryAllByText(/19\.96/i)[0]).toBeInTheDocument();

    const deleteBtn = screen.getByRole('button', { name: /deletar/i });
    userEvent.click(deleteBtn);
  });
});
