import React, { useState, useEffect } from 'react';
import { IconButton , FormControl, Input } from '@material-ui/core';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';

import db from './firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

import './App.css';
import Message from './Message';

function App() {
const [input, setInput] = useState('');
const [messages, setMessages] = useState([]);
const [userName, setUserName] = useState('');

useEffect(() => {
  db.collection('messages')
  .orderBy('timestamp','desc')
  .onSnapshot(snapshot => {
    setMessages(snapshot.docs.map(doc => ({id:doc.id,message:doc.data()})))
  })
}, [])

useEffect(()=>{
 //const name =  prompt('Seu apelido:');

 setUserName(prompt('Seu apelido:'));
},[]);

const sendMessage = (event) => {
  event.preventDefault();

  db.collection('messages').add({
    message: input,
    username: userName,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  });

  setInput('');
}

  return (
    <div className="app">
    <img className="app_logo" src="logo.png" alt="messange logo"/>
     <h1>Messager</h1>
     <h2>Seja bem vindo(a), {userName} </h2>

     <form className="app_form">
      <FormControl className="app_formControl">
        <Input className="app_input" placeholder="Digite sua menssagem..." value={input} onChange={event => setInput(event.target.value)} /> 
        <IconButton
         className="app_iconButton" disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}
        >
          <SendIcon />
        </IconButton>
      </FormControl>
     </form>

     <FlipMove>
      {
        messages.map(({id,message}) => (
          <Message key={id} username={userName} message={message}/>
        ))
     }
     </FlipMove>
    
    </div>
  );
}

export default App;
