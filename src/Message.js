import React from 'react'
import './Message.css';

function Message({ text }) {
  return (
    <div>
      <h2>{ text }</h2>
    </div>
  )
}

export default Message
