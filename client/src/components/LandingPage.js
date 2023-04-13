import React, { useState } from 'react';
import { CSSTransition } from 'react-transition-group';
import Navbar from './Navbar';
import './LandingPage.css';
import ChatInterface from './ChatInterface';
import FeedbackForm from './FeedbackForm';
import CompanyLogo from '../assets/abs-leaves_small.png';

const LandingPage = () => {
  const [showForm, setShowForm] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const handleGetStarted = () => {
    setShowForm(true);
  };

  return (
    <div>
      <Navbar />
      <div className="mobile-company-info">
        <img className='mobile-company-logo' src={CompanyLogo} alt="Aspirin Business Solutions Logo" />
        <span className="mobile-company-name">Aspirin Business Solutions</span>
      </div>
      <main className="landing-page">
        <CSSTransition
          in={!showForm}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <div className='welcome-div'>
            <h1 className="welcome-header">
              Welcome to ReflectAI, our Interactive Feedback Platform!
            </h1>
            <p className='welcome-message'>
              We're thrilled to have you here, and we appreciate your valuable input. Our friendly AI assistant is eager to chat with you and gather your insights on our products.
              Your feedback will help us understand your needs better and shape the future of our offerings.<br /><br />
              To get started, simply type your thoughts or questions into the chatbox, 
              and our AI will guide you through the process. Don't hesitate to be open and honest – your opinions matter to us. Together, let's create exceptional products that truly make a difference.
              Enjoy the conversation!
              </p>
            <button className="get-started-btn" onClick={handleGetStarted}>
              Give Feedback!
            </button>
          </div>
        </CSSTransition>
        <CSSTransition
          in={showForm && !formSubmitted}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <FeedbackForm
            onSubmit={(name, product, consent) => {
              setUserInfo({ name, product, consent });
              setFormSubmitted(true);
            }}
          />
        </CSSTransition>
        <CSSTransition
          in={formSubmitted}
          timeout={500}
          classNames="fade"
          unmountOnExit
        >
          <ChatInterface userInfo={userInfo} />
        </CSSTransition>
      </main>
    </div>
  );
};

export default LandingPage;
