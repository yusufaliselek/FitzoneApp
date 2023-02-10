import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/AuthPages/Login';
import Signup from './pages/AuthPages/Signup';
import Users from './pages/MemberPages/Members';
import Coaches from './pages/CoachPages/Coaches';
import Settings from './pages/Settings';
import CoachDetail from './pages/CoachPages/CoachDetail';
import AddMember from './pages/MemberPages/AddMember';
import AddCoach from './pages/CoachPages/AddCoach';
import Training from './pages/TrainingPages/Training';
import Calendar from './pages/CalendarPages/Calendar';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/dashboard' element={<Dashboard />} />
          <Route path='/members' element={<Users />} />
          <Route path='/members/add' element={<AddMember />} />
          <Route path='/coaches' element={<Coaches />} />
          <Route path='/coaches/add' element={<AddCoach />} />
          <Route path='/coach/:id' element={<CoachDetail />} />
          <Route path='/training' element={<Training />} />
          <Route path='/calendar' element={<Calendar />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </Router>
    </>

  );
}

export default App;