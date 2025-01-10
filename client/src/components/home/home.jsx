import { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';

const Home = ({ socket }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState('');


  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('user', user);

    socket.emit('newUser', { user, socketID: socket.id });
    navigate('/chat');
  }
  return (
    <form onSubmit={handleSubmit} className={styles.home}>
      <h2 className={styles.header}>Chat enter</h2>
      <label htmlFor='user'></label>
      <input type="text" className={styles.userInput} value={user} id='user' onChange={(e) => setUser(e.target.value)} />
      <button type='submit' className={styles.homeBtn}>Enter</button>
    </form>
  )
};

Home.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    id: PropTypes.string,
  }).isRequired,
};

export default Home