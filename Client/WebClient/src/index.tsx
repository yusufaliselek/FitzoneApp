import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './router/Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className='bg-[rgb(248,245,245)]'>
    <Router />
    </div>
  </React.StrictMode>
);

