import { render, screen, fireEvent } from '@testing-library/react';

// Services
import socket from '../services/socket';

// Components
import ChatBox from './ChatBox';

describe('<ChatBox />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('adds message', () => {
    const mockedMessage = {
      name: 'Mocked Name',
      message: 'Mocked Message',
    };
    const mockedSocketEmit = jest.spyOn(socket, 'emit');

    render(<ChatBox />);

    const form = screen.getByTestId('chat-box');
    const nameInput = screen.getByTestId('chat-box.name');
    const messageInput = screen.getByTestId('chat-box.message');

    fireEvent.change(nameInput, {
      target: {
        value: mockedMessage.name,
      },
    });
    fireEvent.change(messageInput, {
      target: {
        value: mockedMessage.message,
      },
    });
    fireEvent.submit(form);

    expect(mockedSocketEmit).toHaveBeenCalledWith('message', mockedMessage);
  });
});
