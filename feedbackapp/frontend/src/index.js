import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AdminFeedbackView from './components/Admin/Feedback/AdminFeedbackView';
import FeedbackForm from './components/feedback/FeedbackForm';
import FeedbackList from './components/feedback/FeedbackList';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />} />
      <Route path='/feedbackform' element={<FeedbackForm />} />
      <Route path='/feedbacklist' element={<FeedbackList />} />
      <Route path='/AdminFeedbackView' element={<AdminFeedbackView />} />
    </Routes>
  </BrowserRouter>
);

reportWebVitals();
