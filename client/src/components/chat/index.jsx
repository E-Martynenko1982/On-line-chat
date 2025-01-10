import { useEffect, useState } from "react";
import Sidebar from "./components/sidebar/sidebar";
import Body from "./components/body/body";
import MessageBlock from "./components/message-block/message-block";
import PropTypes from 'prop-types';
import styles from './styles.module.css';

const ChatPage = ({ socket }) => {
  const [messages, setMessages] = useState([]);
  const [status, setStatus] = useState('');

  useEffect(() => {
    socket.on("response", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });
    return () => {
      socket.off("response");
    };
  }, [socket, messages]);

  useEffect(() => {
    socket.on("responseTyping", (data) => setStatus(data));
    return () => {
      socket.off("responseTyping");
    };
  }, [socket])
  return (
    <div className={styles.chat}>
      <Sidebar socket={socket} />
      <main className={styles.main}>
        <Body messages={messages} socket={socket} status={status} />
        <MessageBlock socket={socket} />
      </main>
    </div>
  );
};

ChatPage.propTypes = {
  socket: PropTypes.shape({
    emit: PropTypes.func.isRequired,
    on: PropTypes.func.isRequired,
    off: PropTypes.func.isRequired,
    id: PropTypes.string,
  }).isRequired,
};

export default ChatPage;