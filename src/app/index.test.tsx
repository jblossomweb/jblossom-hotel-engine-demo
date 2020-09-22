import React from 'react';
import { render } from '@testing-library/react';
import App from '.';

test('renders Repository Search', () => {
  const { getByText } = render(<App />);
  const element = getByText(/Repository Search/i);
  expect(element).toBeInTheDocument();
});
