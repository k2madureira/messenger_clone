import React, { useState, useEffect } from 'react';
import { Button, FormControl, Input, InputLabel, FormHelperText } from '@material-ui/core';
import './App.css';
import Message from './Message';

function App() {
const [input, setInput] = useState('');
const [messages, setMessages] = useState([]);
const [userName, setUserName] = useState('');

useEffect(()=>{
 //const name =  prompt('Seu apelido:');

 setUserName(prompt('Seu apelido:'));
},[input]);

const sendMessage = (event) => {
  event.preventDefault();
  setMessages([...messages, input]);
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
         <Message text={message}/>
       ))
     }
    </div>
  );
}

export default App;
