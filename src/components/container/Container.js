import React,{ useState, useEffect,useRef } from 'react'
import FlipMove from 'react-flip-move';

import bd from '../../config/firebase';
import './Container.css';

import Message from '../message/Message';

function Container({username}) {
  const [messages, setMessages] = useState([]);
  const app_containerRef = useRef(null);

  useEffect(() => {
  
    bd.collection('messages')
    .orderBy('timestamp','desc')
    .onSnapshot(snapshot => {
      setMessages(snapshot.docs.map(doc => ({id:doc.id,message:doc.data()})))
    });
   
   
  }, [])

  return (
    <div className="container">
      <FlipMove 
      className="container_box" 
      ref={app_containerRef}
      >
        {
          messages.map(({id,message}) => (
            <Message key={id} username={username} message={message}/>
          ))
        }
      </FlipMove>
    </div>
  )
}

export default Container
