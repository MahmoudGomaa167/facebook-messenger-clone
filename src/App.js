import React, { useState, useEffect } from 'react';
import { FormControl, Input } from '@material-ui/core';
import SendIcon from '@mui/icons-material/Send';
import { IconButton } from '@mui/material';
import FlipMove from 'react-flip-move';
import db from './firebase';
import { collection, query, onSnapshot, addDoc, serverTimestamp, orderBy } from 'firebase/firestore'
import Message from './Message';
import './App.css';
import logo from './logo.png'

function App() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [username, setUsername] = useState('');

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy('timestamp', 'desc'));
    onSnapshot(q, (snapshot) => {
      setMessages(snapshot.docs.map(doc => ({ message: doc.data(), id: doc.id })))
    })
  }, [])


  useEffect(() => {
    setUsername(prompt(`What's your name?`));
  }, [])

  const handleChange = (e) => {
    setInput(e.target.value)
  }

  const handleSend = (e) => {
    e.preventDefault();
    addDoc(collection(db, 'messages'), {
      username: username,
      message: input,
      timestamp: serverTimestamp()
    })

    setInput('');
  }


  return (
    <div className="App">
      <img className='logo' src={logo} alt="messenger-logo" />
      <h2>Welcome {username}</h2>
      <form className='app__form'>
        <FormControl className='app__formControl'>
          <Input className="app__input" placeholder='Enter a Message...' value={input} onChange={(e) => handleChange(e)} />
          <IconButton className='app__iconButton' disabled={!input} variant='contained' color="primary" type='submit' onClick={handleSend}>
            <SendIcon />
          </IconButton>
        </FormControl>
      </form>

      <FlipMove>
        {
          messages.map(({ id, message }) => (
            <Message key={id} username={username} message={message} />
          ))
        }
      </FlipMove>
    </div >
  );
}

export default App;
