import React, { useState, useEffect } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from './pages/Login';
import Signup from './pages/Signup';
    // <div className='flex'>
    //   <Nav />
    //   <div className={`object-cover w-full h-full relative`}>
    //     <img src={cardio} alt="description of" className={`object-cover w-full h-full absolute`} />
    //     <div className={'relative grid h-screen place-items-center  bg-black/[.3]'}>
    //       <span className={'text-white text-8xl tracking-wide'}>GET INTO YOUR ZONE</span></div>
    //   </div>
    // </div>


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/signup' element={<Signup />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;
