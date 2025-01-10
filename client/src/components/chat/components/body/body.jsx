import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Body = ({ messages, socket, status }) => {
  const navigate = useNavigate();

  const handleLeave = () => {
    const user = localStorage.getItem('user');
    if (user && socket && socket.id) {
      socket.emit('logout', socket.id);
      localStorage.removeItem('user');
      navigate('/');
    } else {
      console.error('Socket is not initialized');
    }
  };

  return (
    <div className={styles.body}>
      <header className={styles.header}>
        <button className={styles.btn} onClick={handleLeave}>Exit chat</button>
      </header>
      <div className={styles.container}>
        {messages.map(element =>
          element.name === localStorage.getItem('user') ? (
            <div key={element.id} className={styles.chats}>
              <p className={styles.senderName}>{element.name}</p>
              <div className={styles.messageSender}>
                <p>{element.text}</p>
              </div>
            </div>
          ) : (
            <div key={element.id} className={styles.chats}>
              <p className={styles.senderName}>{element.name}</p>
              <div className={styles.messageRecipient}>
                <p>{element.text}</p>
              </div>
            </div>
          )
        )}
        <div className={styles.status}>
          <p>{status}</p>
        </div>
      </div>
    </div>
  );
};

Body.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      text: PropTypes.string.isRequired,

    })
  ).isRequired,
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    id: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
  status: PropTypes.string.isRequired
};

export default Body;