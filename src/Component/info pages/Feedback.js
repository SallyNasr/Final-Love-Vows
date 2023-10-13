import React, { useState, useEffect } from 'react';
import './Feedback.css';
import Navigationbar from '../Navigationbar';
import StarRating from './StarRating';
import Footer from '../Footer';
import { getDatabase, ref, push } from 'firebase/database';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';

import ban2 from "../../images/bannner2.png";

function FeedbackPage() {
  const [rating, setRating] = useState(0);
  const [comments, setComments] = useState('');
  const [feedback, setFeedback] = useState({
    name: '',
    email: '',
    feedbackText: '',
    rating: '',
  });
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const [userLoggedIn, setUserLoggedIn] = useState(false);

  const handleRatingChange = (newRating) => {
    setRating(newRating); // Update the rating state
  };

  const checkUserLoggedIn = () => {
    const user = auth.currentUser;
    if (user) {
      setUserLoggedIn(true);
      setFeedback({
        ...feedback,
        email: user.email,
      });
    } else {
      setUserLoggedIn(false);
    }
  };

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFeedback({
      ...feedback,
      [name]: value,
    });
  };

  const handleCommentsChange = (event) => {
    setComments(event.target.value);
  };
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!userLoggedIn) {//test1
      alert('Please log in first.');
      navigate("/login");
      return;
    }

    if (!feedback.name || !feedback.email || !comments) {//test2
      setErrorMsg('Please fill out all required fields.');
      return;
    }

    setErrorMsg('');

    console.log('Submitted Feedback:', { rating, comments });

    const db = getDatabase();
    const feedbackRef = ref(db, 'feedback');

    const feedbackData = {
      name: feedback.name,
      email: feedback.email,
      feedbackText: comments,
      rating: rating,
    };

    try {
      await push(feedbackRef, feedbackData);

      setRating(0);
      setComments('');
      setFeedback({
        name: '',
        email: '',
        feedbackText: '',
      });
      console.log('Feedback data added to Firebase Realtime Database successfully');
      setSuccessMsg('Your feedback was successfully submitted. Thank you for contacting us!');//test3
    } catch (error) {//test4
      console.error('Error adding feedback data to Firebase Realtime Database:', error);
      setErrorMsg('An error occurred while submitting your feedback. Please try again later.');
    }
  };

  return (
    <>
      <Navigationbar />
      <div>
        <img src={ban2} alt='banner-image1' style={{ position: "relative" }} height='65px' width='100%' />
      </div>
      <div className="feedback-container" >
        <form onSubmit={handleSubmit} className='feedback-form'>
          <h1>Provide Your Feedback</h1>
          {errorMsg && <div className="error-msg">{errorMsg}</div>}
          {successMsg && <div className="success-msg">{successMsg}</div>}
          <div>
            <label htmlFor="name">Name:</label>
            <input className='name-feedback'
              type="text"
              id="feedback-name"
              name="name"
              value={feedback.name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label htmlFor="email">Email:</label>
            <input className='email-feedback'
              type="email"
              id="feedback-email"
              name="email"
              value={feedback.email}
              onChange={handleChange}
              required
              disabled={userLoggedIn}
            />
          </div>

          <div className="comments-section">
            <label>Comments:</label>
            <textarea className='feedback-textarea'
              value={comments}
              onChange={handleCommentsChange}
              rows={4}
            />
          </div>

          <div>
            <StarRating onRatingChange={handleRatingChange} />
          </div>

          <button className='submit-feedback' type="submit">Submit Feedback</button>
        </form>
      </div>
      <Footer />
    </>
  );
}

export default FeedbackPage;
