import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Users from './pages/Users';
import Coaches from './pages/Coaches';
import Settings from './pages/Settings';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/members' element={<Users />} />
          <Route path='/coaches' element={<Coaches />} />
          <Route path='/settings' element={<Settings />} />

        </Routes>
      </Router>
    </>

  );
}

export default App;
