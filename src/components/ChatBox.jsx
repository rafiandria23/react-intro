import { useState } from 'react';

// Services
import socket from '../services/socket';

// Hooks
import useSocketMessages from '../hooks/useSocketMessages';

function ChatBox() {
  const [text, setText] = useState('');

  const messages = useSocketMessages();

  const handleSubmit = (event) => {
    event.preventDefault();
    socket.emit('message', text);
    setText('');
  };

  return (
    <form className='w-100' onSubmit={handleSubmit}>
      <textarea
        className='border border-gray-700 rounded px-3 py-2 mb-3 w-full'
        name='body'
        placeholder='message'
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button
        className='block border border-gray-700 rounded px-5 py-2'
        type='submit'
      >
        Send Message
      </button>

      {JSON.stringify(messages)}
    </form>
  );
}

export default ChatBox;
