import socketIO from 'socket.io-client';
import { Route, Routes } from 'react-router-dom';
import Home from './components/home/home';
import Chat from './components/chat';

const socket = socketIO.connect('http://localhost:5000');

function App() {

  return (
    <Routes>
      <Route path='/' element={<Home socket={socket} />} />
      <Route path='/chat' element={<Chat socket={socket} />} />
    </Routes>
  )
}

export default App;
