import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Login from '../pages/AuthPages/Login';
import Signup from '../pages/AuthPages/Signup';
import Users from '../pages/MemberPages/Members';
import Settings from '../pages/Settings/Settings';
import TrainerDetail from '../pages/TrainerPages/TrainerDetail';
import AddMember from '../pages/MemberPages/AddMember';
import AddTrainer from '../pages/TrainerPages/AddTrainer';
import Training from '../pages/TrainingPages/Training';
import Calendar from '../pages/CalendarPages/Calendar';
import AdminPanel from '../pages/AdminPanel/AdminPanel';
import Trainers from '../pages/TrainerPages/Trainers';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/dashboard' element={<Dashboard />} />
                <Route path='/members' element={<Users />} />
                <Route path='/members/add' element={<AddMember />} />
                <Route path='/trainers' element={<Trainers />} />
                <Route path='/trainers/add' element={<AddTrainer />} />
                <Route path='/trainers/:id' element={<TrainerDetail />} />
                <Route path='/training' element={<Training />} />
                <Route path='/calendar' element={<Calendar />} />
                <Route path='/settings' element={<Settings />} />
                <Route path='/admin' element={<AdminPanel />} />
                <Route path='*' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router