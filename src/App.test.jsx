import { render, screen } from '@testing-library/react';

// App
import App from './App';

describe('<App />', () => {
  beforeAll(() => {
    render(<App />);
  });

  it('should render title...', () => {
    expect(screen.getByText(/Post an Article/i)).toBeInTheDocument();
  });
});
