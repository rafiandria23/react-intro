import { render, screen } from '@testing-library/react';

// Components
import ChatList from './ChatList';

describe('<ChatList />', () => {
  test('renders messages properly', () => {
    const mockedMessages = [
      {
        id: 'Mocked ID',
        name: 'Mocked Name',
        message: 'Mocked Message',
      },
    ];

    render(<ChatList messages={mockedMessages} />);

    const name = screen.getByText(new RegExp(mockedMessages[0].name, 'i'));
    const message = screen.getByText(
      new RegExp(mockedMessages[0].message, 'i'),
    );

    expect(name).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
});
