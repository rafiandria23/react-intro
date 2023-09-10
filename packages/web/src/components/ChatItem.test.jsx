import { render, screen } from '@testing-library/react';

// Components
import ChatItem from './ChatItem';

describe('<ChatItem />', () => {
  test('renders a message properly...', () => {
    const mockedMessage = {
      id: 'Mocked ID',
      name: 'Mocked Name',
      message: 'Mocked Message',
    };

    render(<ChatItem message={mockedMessage} />);

    const name = screen.getByText(new RegExp(mockedMessage.name, 'i'));
    const message = screen.getByText(new RegExp(mockedMessage.message, 'i'));

    expect(name).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
});
