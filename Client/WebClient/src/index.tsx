import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Router from './router/Router';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <div className='bg-[#f8f5f5]'>
    <Router />
    </div>
  </React.StrictMode>
);

