import { useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';


const MessageBlock = ({ socket }) => {
  const [message, setMessage] = useState('');

  const isTyping = () => socket.emit('typing', `${localStorage.getItem('user')} is typing...`);


  const handleSend = (e) => {
    e.preventDefault();
    if (message.trim() && localStorage.getItem('user')) {
      socket.emit('message', {
        text: message,
        name: localStorage.getItem('user'),
        id: `{socket.id}-${Math.random()}`,
        socketID: socket.id,
      });

    }
    setMessage('');
  };
  return (
    <div className={styles.messageBlock}>
      <form className={styles.form} onSubmit={handleSend}>
        <input
          type="text"
          className={styles.userMessage}
          placeholder="Type your message here"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={isTyping}
        />
        <button className={styles.btn}>Say</button>
      </form>
    </div>
  );
};

MessageBlock.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    id: PropTypes.string,
  }).isRequired,
}
export default MessageBlock;