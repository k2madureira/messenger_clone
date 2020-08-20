import React, { useState, useEffect } from 'react'
import { IconButton , FormControl, Input } from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';

import bd from '../../config/firebase';
import 'firebase/firestore';
import firebase from 'firebase/app';

import './Form.css';

function Form({username}) {

  username = username || 'ET';
  const [input, setInput] = useState('');
  const [userType, setUserType] = useState([]);

  useEffect(() => {
    
    bd.collection('userTyping')
    .orderBy('timestamp','desc')
    .onSnapshot(snapshot => {
      setUserType(snapshot.docs.map(doc => doc.data()))
    });
   
  }, [])


  const sendMessage = (event) => {
    event.preventDefault();
  
    bd.collection('messages').add({
      message: input,
      username: username,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    bd.collection('userTyping').doc("user").delete();
  
    setInput('');
  }

  const typeing = (event) => {
    setInput(event.target.value);
   
    let value = event.target.value? username || "ET" : "";
     
    bd.collection('userTyping').doc("user").set({
      user: value,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    })
  }

  
  
  return (
    <>
    <p>{
      userType.map(u => u.user) != "" && 
      userType.map(u => u.user) != username?
      `${userType.map(u => u.user)} está digitando...` : 
      ''
      
      }</p>
    <form className="form_box">
     
      <FormControl className="form_control">
        <p>{username !== 'ET' ? '🤖' : '👽'} ({username })</p>
        <Input className="form_input_send" placeholder="Digite sua menssagem..." value={input} onChange={event => typeing(event)} /> 
        <IconButton
        className="form_button_icon" disabled={!input} variant="contained" color="primary" type='submit' onClick={sendMessage}
        >
          <SendIcon />
        </IconButton>
      </FormControl>
    </form>
    </>
  )
}

export default Form
