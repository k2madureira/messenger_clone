import React from 'react'
import './Message.css';

function Message({ text, username }) {
  return (
    <div>
      <h2>{ username }:{ text }</h2>
    </div>
  )
}

export default Message
