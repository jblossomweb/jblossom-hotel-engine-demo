import React from 'react';
import { render } from '@testing-library/react';
import App from '.';

describe('app/index', () => {
  it('renders the app without crashing', () => {
    render(<App />);
  });

  it('renders "Repository Search"', () => {
    const { getByText } = render(<App />);
    const element = getByText(/Repository Search/i);
    expect(element).toBeInTheDocument();
  });
});
