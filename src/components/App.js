import React, { useState, useEffect } from 'react';

import './App.css';
import Container from './container/Container';
import Form from './messageForm/Form';

const App = () => {

const [userName, setUserName] = useState('');


useEffect(()=>{
  setUserName(prompt('Seu apelido:'));
},[])


  return (
    <div className="app">
      <div className="app_header">
        <img className="app_logo" src="logo.png" alt="messange logo"/>
      </div>
      
      <Container username={userName}/>
      <Form username={userName}/>
      
    </div>
  );
}

export default App;
