import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import React, { useState, useEffect } from 'react';
import FitzoneHeader from '../components/Header/FitzoneHeader';
import Nav from '../components/Nav/Nav';
import Cookies from 'js-cookie';
import * as jose from 'jose'
import { FitzoneApi } from '../services/fitzoneApi';
import { useNavigate } from 'react-router-dom';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

interface UserProps {
    username: string;
    email: string;
    currentPassword: string;
    newPassword: string;
    newPasswordConfirm: string;
    biography: string;
}

const Settings = () => {
    const navigate = useNavigate()
    const [value, setValue] = React.useState(0);

    const [userProps, setUserProps] = useState<UserProps>({ biography: '', email: '', newPassword: '', newPasswordConfirm: "", currentPassword: "", username: '' });

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const RefreshToken = async () => {
        if (!Cookies.get('token')) {
             return FitzoneApi.ResfreshAccessTokenByRefreshToken().then((response) => {
                 Cookies.set('token', response.data.accessToken, { expires: new Date(response.data.accessTokenExpiration) });
                 Cookies.set('refreshToken', response.data.refreshToken, { expires: new Date(response.data.refreshTokenExpiration) });
                 console.log("Token yenilendi");
             }).catch((error) => {
                 console.log(error)
                 Cookies.remove('token');
                 Cookies.remove('refreshToken');
                 navigate('/login')
                 console.log("Token süresi dolmuş");
             });
         }
     }
 
     useEffect(() => {
         RefreshToken()
         // Cookie deki değerleri jose ile decode edip state e atıyoruz.
            const token = Cookies.get('token')
     }, [])

    return (
        <div className='flex w-screen h-screen'>
            {/* Navbar */}
            <Nav pageName='Ayarlar' />
            <div className='flex flex-col w-full h-screen'>
                {/* Header */}
                <FitzoneHeader pageName='Ayarlar' />
                <Box sx={{ width: '100%', paddingX: 2, overflowY: "auto" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Antrenör Bilgisi" {...a11yProps(0)} />
                        <Tab label="Güvenlik" {...a11yProps(1)} />
                        {true && <Tab label="Yetkiler" {...a11yProps(2)} />}
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <div className='flex h-auto justify-center'>
                            <div className='flex flex-col w-1/2 pr-5 gap-y-2'>
                                <p className='text-sm text-gray-600 mb-2 pb-1 border-b'>Hesap Bilgileri</p>
                                <div className="mb-2 w-full">
                                    <label
                                        form="username"
                                        className="block text-sm font-semibold text-gray-600"
                                    >
                                        Kullanıcı Adı
                                    </label>
                                    <input
                                        type="text"
                                        value={userProps.username} onChange={e => setUserProps({ ...userProps, username: e.target.value })}
                                        className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="mb-2 w-full">
                                    <label
                                        form="email"
                                        className="block text-sm font-semibold text-gray-600"
                                    >
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={userProps.email} onChange={e => setUserProps({ ...userProps, email: e.target.value })}
                                        className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col w-1/2 pl-5 gap-y-2'>
                                <p className='text-sm text-gray-600 mb-2 pb-1 border-b'>Kişisel Bilgiler</p>
                                <div className="mb-2 w-full">
                                    <label
                                        form="username"
                                        className="block text-sm font-semibold text-gray-600"
                                    >
                                        Adı
                                    </label>
                                    <input
                                        type="text"
                                        value={userProps.username} onChange={e => setUserProps({ ...userProps, username: e.target.value })}
                                        className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="mb-2 w-full">
                                    <label
                                        form="username"
                                        className="block text-sm font-semibold text-gray-600"
                                    >
                                        Soyadı
                                    </label>
                                    <input
                                        type="text"
                                        value={userProps.username} onChange={e => setUserProps({ ...userProps, username: e.target.value })}
                                        className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="mb-2 w-full">
                                    <label
                                        form="biography"
                                        className="block text-sm font-semibold text-gray-600"
                                    >
                                        Biyografi
                                    </label>
                                    <textarea
                                        value={userProps.username} onChange={e => setUserProps({ ...userProps, username: e.target.value })}
                                        className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                            </div>

                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className='w-1/3 h-auto items-center gap-x-4'>
                            <div className="mb-2 w-full">
                                <label
                                    form="currentPassword"
                                    className="block text-sm font-semibold text-gray-600"
                                >
                                    Mevcut Şifre
                                </label>
                                <input
                                    type="password"
                                    spellCheck='true'
                                    value={userProps.currentPassword} onChange={e => setUserProps({ ...userProps, currentPassword: e.target.value })}
                                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2 w-full">
                                <label
                                    form="newPassword"
                                    className="block text-sm font-semibold text-gray-600"
                                >
                                    Yeni Şifre
                                </label>
                                <input
                                    type="password"
                                    spellCheck='true'
                                    value={userProps.newPassword} onChange={e => setUserProps({ ...userProps, newPassword: e.target.value })}
                                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <div className="mb-2 w-full">
                                <label
                                    form="newPasswordConfirm"
                                    className="block text-sm font-semibold text-gray-600"
                                >
                                    Yeni Şifreyi Tekrar Giriniz
                                </label>
                                <input
                                    type="password"
                                    spellCheck='true'
                                    value={userProps.newPasswordConfirm} onChange={e => setUserProps({ ...userProps, newPasswordConfirm: e.target.value })}
                                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Antrenör Yetkileri
                    </TabPanel>
                </Box>

            </div>
        </div >
    )
}

export default Settings