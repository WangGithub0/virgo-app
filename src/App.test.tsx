import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App'; // Adjust the import path according to your project structure

describe('Virgo project test', () => {
  test('selecting a radio button for proficiency', async () => {
    render(<App />);
    // Assuming you have a radio button labeled "Yes" for ReactJS proficiency
    const yesRadioButton = screen.getByRole('radio', { name: /yes/i });
    expect(yesRadioButton).toBeInTheDocument(); // Check if the radio button is rendered

    // Simulate selecting the "Yes" radio button
    await userEvent.click(yesRadioButton);

    // Assert that the "Yes" radio button is checked
    expect(yesRadioButton).toBeChecked();
  });

});
