import React, { useState, useEffect } from 'react';
import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';
import { Box } from '@mui/material';
import { FitzoneApi } from '../../services/fitzoneApi';
import { TabPanel, a11yProps } from '../../utils/funcs/TabPanel';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';
import PassiveTrainers from './PassiveTrainers';
import TrainerPermissions from './TrainerPermissions';
import PassiveMembers from './PassiveMembers';
import RegisterUsers from './RegisterUsers';
import { AntTab, AntTabs } from '../../components/Tabs/Tabs';
import RefreshToken from '../../utils/funcs/RefreshToken';
import clearTokens from '../../utils/funcs/ClearTokens';

const AdminPanel = () => {

    // Default State
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    // Default Functions
    const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        RefreshToken();
        const role = decodeJwt(Cookies.get('token')!).typ;
        if (role !== 'admin') {
            clearTokens();
        }
    }, []);

    return (
        <div className='flex w-screen h-screen overflow-hidden'>
            {/* Navbar */}
            <Nav pageName='' />
            <div className='flex flex-col w-full h-screen'>
                {/* Header */}
                <Header pageName='Admin Paneli' />
                <Box sx={{ width: '100%', paddingX: 2, height: "calc(100vh-112px)" }}>
                    <AntTabs value={value} onChange={handleChangeTabs}>
                        <AntTab label="Yetki Altyapısı" {...a11yProps(0)} />
                        <AntTab label="Dondurulmuş Antrenörler" {...a11yProps(1)} />
                        <AntTab label="Dondurulmuş Üyeler" {...a11yProps(2)} />
                        <AntTab label="Kayıt Onayı Bekleyen Kullanıcılar" {...a11yProps(3)} />
                    </AntTabs>
                    <TabPanel value={value} index={0}>
                        <TrainerPermissions />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <PassiveTrainers />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <PassiveMembers />
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <RegisterUsers />
                    </TabPanel>
                </Box>
            </div>
        </div>
    );
};

export default AdminPanel;
