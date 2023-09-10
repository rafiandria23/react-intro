import { Component } from 'react';

// Components
import ChatItem from './ChatItem';

class ChatList extends Component {
  render() {
    return (
      <div>
        {this.props.messages.map((message) => {
          return <ChatItem key={message.id} message={message} />;
        })}
      </div>
    );
  }
}

export default ChatList;
