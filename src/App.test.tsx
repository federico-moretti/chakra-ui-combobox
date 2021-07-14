import React from 'react';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { render } from './test-utils';
import { App } from './App';

test('Use App', async () => {
  render(<App />);

  const button = screen.getByText('Invite teammates');
  userEvent.click(button);
  screen.queryByTestId('user-invite-modal');
  const input = screen.getByTestId('user-invite-combobox-input');
  userEvent.type(input, 'federico@email.com');
  userEvent.keyboard('{arrowdown}{enter}');
  const submit = screen.getByText('Invite');
  userEvent.click(submit);

  await waitFor(() => {
    expect(screen.queryByTestId('user-invite-modal')).not.toBeInTheDocument();
  });

  screen.getByText('Invited teammates:');
  screen.getAllByText('federico@email.com');
});
