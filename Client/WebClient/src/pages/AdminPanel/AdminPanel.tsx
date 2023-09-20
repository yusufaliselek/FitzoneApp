import React, { useState, useEffect } from 'react';
import Nav from '../../components/Nav/Nav';
import Header from '../../components/Header/Header';
import { Box, Tab, Tabs } from '@mui/material';
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

const AdminPanel = () => {

    // Default State
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    // Default Functions
    const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const goLogin = () => navigate('/login');

    const clearToken = () => {
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        goLogin();
    };

    const RefreshToken = async () => {
        if (!Cookies.get('token')) {
            FitzoneApi.ResfreshAccessTokenByRefreshToken().then(response => {
                Cookies.set('token', response.data.accessToken, { expires: new Date(response.data.accessTokenExpiration) });
                Cookies.set('refreshToken', response.data.refreshToken, { expires: new Date(response.data.refreshTokenExpiration) });
                console.log("Token yenilendi");
            }
            ).catch(error => {
                console.log(error);
                clearToken();
            });
        }
    };

    useEffect(() => {
        RefreshToken();
        const role = decodeJwt(Cookies.get('token')!).typ;
        if (role !== 'admin') {
            clearToken();
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
