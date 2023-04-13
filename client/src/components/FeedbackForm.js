import React, { useState } from 'react';
import './FeedbackForm.css';
import YourImage from '../assets/form-image.png'; // Replace with the path to your image

const FeedbackForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [product, setProduct] = useState('');
  const [consent, setConsent] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(name, product, consent);
  };

  return (
    <div className='form-container'>
      <div className='image-container'>
        <img src={YourImage} alt='Your description' />
      </div>
      <div className='form-div'>
        <h1 className='form-header'>
          First, we just need a few bits from you...
        </h1>
        <form className="feedback-form" onSubmit={handleSubmit}>
          <div className='input-group'>
            <label className="feedback-form-label" htmlFor="name">
              Name (optional):
            </label>
            <input
              className="feedback-form-input"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <br />
          <div className='input-group'>
            <label className="feedback-form-label" htmlFor="product">
              Product:
            </label>
            <select
              className="feedback-form-select"
              id="product"
              value={product}
              onChange={(e) => setProduct(e.target.value)}
            >
              <option value="">Select a product</option>
              {/* Add your products here */}
              <option value="alg">Aspirin's Leadership Gym</option>
              <option value="llp">Liberating Leadership Programme</option>
              <option value="oth">Something Else!</option>
            </select>
          </div>
          <br />
          <label className="feedback-form-label-consent" htmlFor="consent">
            <input
              className="feedback-form-checkbox"
              type="checkbox"
              id="consent"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
            />
            I give my consent for my answers to be used 
          </label>
          <br />
          <button className="feedback-form-submit" type="submit">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default FeedbackForm;
