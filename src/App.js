import React, { useState } from 'react';
import './App.css';

function App() {
const [input, setInput] = useState('');
const [messages, setMessages] = useState([]);

const sendMessage = (event) => {
  setMessages([...messages, input]);
  setInput('');
}

  return (
    <div className="App">
     <h1>Messager</h1>
     <input value={input} onChange={event => setInput(event.target.value)}/>
     <button onClick={sendMessage}> Send </button>
    </div>
  );
}

export default App;
