import React, { useState, useEffect, useRef } from 'react';
import { fetchGptResponse } from '../api.js';
import { CSSTransition } from 'react-transition-group';
import './ChatInterface.css';
import SendButtonArrow from '../assets/submit-arrow.png';
import userAvatar from '../assets/user-avatar.png';
import gptAvatar from '../assets/reflectai-logo.png';

// Main ChatInterface Component
const ChatInterface = () => {
  // State for storing messages in the chat
  const [messages, setMessages] = useState([
    {
      text:
        "Hello! I am Nymo (pronounced Nee-mo), ReflectAI's friendly feedback robot! I would love to chat with you about your experience with Aspirin Business Solutions. Have you been a member of Aspirin's Leadership Gym, a participant of our Liberating Leadership Programme, or something else?",
      user: false,
    },
  ]);  

  // State for the user input
  const [input, setInput] = useState('');
  // Ref for automatically scrolling to the last message
  const chatLogRef = useRef(null);
  // State for controlling input animation
  const [showInput, setShowInput] = useState(false);
  //State for displaying the typing indicator
  const [isTyping, setIsTyping] = useState(false);
  // State for storing GPT Messages
  const [gptMessages, setGptMessages] = useState([]);

  // Timeout for animating input delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInput(true);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  // Scroll to the last message when a new message is added
  useEffect(() => {
    if (chatLogRef.current) {
      chatLogRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);  

  // Function for adding the GPT response to the chat
  const addGptResponse = async (gptResponse) => {
    if (messages.length === 0) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: gptResponse, user: false },
      ]);
    } else {
      const words = gptResponse.split(' ');
      let currentMessage = '';
  
      const addNextWord = (index) => {
        if (index < words.length) {
          currentMessage += words[index] + ' ';
          setMessages((prevMessages) => [
            ...prevMessages.slice(0, -1),
            { text: currentMessage, user: false },
          ]);
  
          setTimeout(() => {
            addNextWord(index + 1);
          }, 100); // Adjust this value to control the delay between words
        }
      };
  
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: currentMessage, user: false },
      ]);
  
      addNextWord(0);
    }
  };
  
  // Function for sending user messages and fetching GPT response
  const sendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { text: input, user: true }]);
      setGptMessages([...gptMessages, { role: 'user', content: input }]);
      setInput('');
  
      setIsTyping(true);
  
      const gptResponse = await fetchGptResponse(gptMessages.concat({ role: 'user', content: input }));
      addGptResponse(gptResponse);
  
      setIsTyping(false);
    }
  };
  
  
  // Function for rendering the typing indicator
  const renderTypingIndicator = () => {
    return (
      <div className="typing-indicator">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </div>
    );
  };

  // Function for rendering individual messages
  const renderMessage = (message, index) => {
    const isUser = message.user;
    const avatar = isUser ? userAvatar : gptAvatar;

    return (
      <React.Fragment key={index}>
        <div className={`chat-message ${isUser ? 'user' : 'ai'}`}>
          <img className="message-avatar" src={avatar} alt="Avatar" />
          <div className="message-content">{message.text}</div>
        </div>
        <hr className="message-divider" />
      </React.Fragment>
    );
  };

  // Render the chat interface
  return (
    <CSSTransition
    in={showInput}
    timeout={500}
    classNames="fade"
    unmountOnExit
    >
    <div className="chat-interface">
      <div className="chat-log">
        {messages.map((message, index) => renderMessage(message, index))}
        {isTyping && renderTypingIndicator()}
        <div ref={chatLogRef}></div>
      </div>

        <form onSubmit={sendMessage} className="message-input">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here"
            className="input-box"
          />
          <button type="submit" className="send-button"><img className='send-button-img' src={SendButtonArrow} alt="Submit Button Arrow" /></button>
        </form>
    </div>
    </CSSTransition>
  );
};

export default ChatInterface;
