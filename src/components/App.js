import React, { useState, useEffect,useRef } from 'react';
import { IconButton , FormControl, Input } from '@material-ui/core';
import FlipMove from 'react-flip-move';
import SendIcon from '@material-ui/icons/Send';

import db from './config/firebase';
import firebase from 'firebase/app';
import 'firebase/firestore';

import './App.css';
import Message from './message/Message';



const App = () => {
const [input, setInput] = useState('');
const [messages, setMessages] = useState([]);
const [userName, setUserName] = useState('');
const app_containerRef = useRef(null);



useEffect(() => {
  
  db.collection('messages')
  .orderBy('timestamp','desc')
  .onSnapshot(snapshot => {
    setMessages(snapshot.docs.map(doc => ({id:doc.id,message:doc.data()})))
  });
 
 
}, [])

useEffect(()=>{
  setUserName(prompt('Seu apelido:'));
},[])

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
      <div className="app_header">
        <img className="app_logo" src="logo.png" alt="messange logo"/>
        <h2>Seja bem vindo(a), {userName || '👽'} </h2>
      </div>
      <div className="app_container">
     
        <FlipMove className="app_messages_box" ref={app_containerRef}>
          {
            messages.map(({id,message}) => (
              <Message key={id} username={userName} message={message}/>
            ))
          }
        </FlipMove>

      </div>

      
      <form className="app_form">
          <FormControl className="app_formControl">
            <p>{userName ? '🤖' : '👽'} ({userName || 'ET'})</p>
            <Input className="app_input" placeholder="Digite sua menssagem..." value={input} onChange={event => setInput(event.target.value)} /> 
            <IconButton
            className="app_iconButton" disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}
            >
              <SendIcon />
            </IconButton>
          </FormControl>
        </form>
    </div>
  );
}

export default App;
