import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Training from '../pages/TrainingPages/Training';
import Calendar from '../pages/CalendarPages/Calendar';

// Configurations
import AdminPanel from '../pages/AdminPanel/AdminPanel';
import Settings from '../pages/Settings/Settings';

// Auth
import Login from '../pages/Auth/Login';
import Signup from '../pages/Auth/Signup';

// Trainers
import Trainers from '../pages/Trainers/Trainers';
import AddTrainer from '../pages/Trainers/AddTrainer';
import TrainerDetail from '../pages/Trainers/TrainerDetail';

// Members
import AddMember from '../pages/Members/AddMember';
import Members from '../pages/Members/Members';
import MemberDetail from '../pages/Members/MemberDetail';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path='/signup' element={<Signup />} />

                <Route path='/dashboard' element={<Dashboard />} />

                <Route path='/members' element={<Members />} />
                <Route path='/members/add' element={<AddMember />} />
                <Route path='/members/:id' element={<MemberDetail />} />

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