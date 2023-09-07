import { render, screen, fireEvent } from '@testing-library/react';

// Services
import socket from '../services/socket';

// Components
import ChatBox from './ChatBox';

describe('<ChatBox />', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test('adds a message...', () => {
    const mockedMessage = 'Mocked Message';
    const mockedSocketEmit = jest.spyOn(socket, 'emit');

    render(<ChatBox />);

    const form = screen.getByTestId('chat-box-form');
    const messageInput = screen.getByTestId('chat-box-form.message');

    fireEvent.change(messageInput, {
      target: {
        value: mockedMessage,
      },
    });
    fireEvent.submit(form);

    expect(mockedSocketEmit).toHaveBeenCalledWith('message', mockedMessage);
  });
});
