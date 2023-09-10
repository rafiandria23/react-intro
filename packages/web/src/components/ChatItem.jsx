function ChatItem(props) {
  return (
    <div key={props.message.id} className='mb-5'>
      <h4 className='text-lg font-semibold'>{props.message.name}</h4>

      <p>{props.message.message}</p>
    </div>
  );
}

export default ChatItem;
