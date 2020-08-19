import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel } from '@material-ui/core';

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
    setMessages(snapshot.docs.map(doc => doc.data()))
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
    <div className="App">
     <h1>Messager</h1>
     <h2>Seja bem vindo(a), {userName} </h2>
     <form action="">

      <FormControl>
          <InputLabel >Digite sua menssagem...</InputLabel>
          <Input value={input} onChange={event => setInput(event.target.value)} />
          <Button disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}> Send </Button>
        </FormControl>

     </form>
     
     {
       messages.map(message => (
         <Message username={userName} message={message}/>
       ))
     }
    </div>
  );
}

export default App;
