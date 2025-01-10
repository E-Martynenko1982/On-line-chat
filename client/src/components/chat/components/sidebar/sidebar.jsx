import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const Sidebar = ({ socket }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    socket.on('responseNewUser', (data) => setUsers(data));
    return () => {
      socket.off('responseNewUser');
    };
  }, [socket]);

  return (
    <div className={styles.sidebar}>
      <h4 className={styles.header}>Users</h4>
      <ul className={styles.users}>
        {users.map(el => (
          <li key={el.socketID}>{el.user}</li>
        ))}
      </ul>
    </div>
  );
};

Sidebar.propTypes = {
  socket: PropTypes.shape({
    on: PropTypes.func.isRequired,
    off: PropTypes.func.isRequired,
  }).isRequired,
};

export default Sidebar;