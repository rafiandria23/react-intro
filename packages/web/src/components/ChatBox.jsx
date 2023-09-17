import { useState, useEffect } from 'react';

// Services
import socket from '../services/socket';

// Hooks
import useSocketMessages from '../hooks/useSocketMessages';

// Components
import ChatList from './ChatList';

function ChatBox() {
  const [disabled, setDisabled] = useState(true);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const messages = useSocketMessages();

  useEffect(() => {
    setDisabled(!!name.match(/^\s*$/g) || !!message.match(/^\s*$/g));
  }, [setDisabled, name, message]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const newMessage = {
      name,
      message,
    };

    socket.emit('message', newMessage);
    setMessage('');
  };

  return (
    <form data-testid='chat-box' className='w-100' onSubmit={handleSubmit}>
      <input
        data-testid='chat-box.name'
        className='border border-gray-700 rounded px-3 py-2 mb-3 w-full'
        name='name'
        placeholder='Your Name'
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <textarea
        data-testid='chat-box.message'
        className='border border-gray-700 rounded px-3 py-2 mb-3 w-full'
        name='body'
        placeholder='Message'
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <button
        className='block border border-gray-700 rounded px-5 py-2 mb-6'
        type='submit'
        disabled={disabled}
      >
        Send Message
      </button>

      <div>
        <ChatList messages={messages} />
      </div>
    </form>
  );
}

export default ChatBox;
