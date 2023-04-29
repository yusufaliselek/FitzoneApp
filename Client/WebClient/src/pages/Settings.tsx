import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import React, { SelectHTMLAttributes, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import FitzoneHeader from '../components/Header/FitzoneHeader';
import Nav from '../components/Nav/Nav';
import PhotoUpload from '../components/PhotoUpload/PhotoUpload';
import { FitzoneApi } from '../services/fitzoneApi';
import { UserProps } from '../types/Types';
import { cities } from '../assets/Cities';

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

const Settings = () => {
    const navigate = useNavigate()
    const [value, setValue] = React.useState(0);
    const [firstName, setFirstName] = useState<string>('');

    const [userProps, setUserProps] = useState<UserProps>({
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        personalPhoto: '',
        biography: '',
    });

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

    const GetUserByIdentityName = async () => {
        FitzoneApi.GetUserByIdentityName().then((response) => {
            console.log(response.data)



            setUserProps({
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                username: response.data.userName,
                email: response.data.email,
                personalPhoto: response.data.personalPhoto,
                biography: response.data.biography,
                gender: response.data.gender
            });

            const firstName = response.data.firstName
            setFirstName(firstName)
        })
    }

    useEffect(() => {

        RefreshToken()

        GetUserByIdentityName()

    }, [])

    return (
        <div className='flex w-screen h-screen'>
            {/* Navbar */}
            <Nav pageName='Ayarlar' />
            <div className='flex flex-col w-full h-screen'>
                {/* Header */}
                <FitzoneHeader pageName='Ayarlar' />
                <Box sx={{ width: '100%', paddingX: 2, overflowY: "auto", height: "calc(100vh-112px)" }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Antrenör Bilgisi" {...a11yProps(0)} />
                        <Tab label="Güvenlik" {...a11yProps(1)} />
                        {true && <Tab label="Yetkiler" {...a11yProps(2)} />}
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <div className='flex flex-col w-full h-full justify-center items-center'>
                            <div className='flex items-center gap-x-4'>
                                <PhotoUpload photo={userProps.personalPhoto} />
                                <label>{!firstName ? userProps.email : userProps.firstName + " " + userProps.lastName}</label>
                            </div>
                            <div className='flex w-full justify-center items-start gap-x-5'>
                                <div className='flex flex-col justify-center'>
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
                                            className="block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
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
                                            className="block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                    <div className='mb-2 w-full'>
                                        <label
                                            form="gender"
                                            className="block text-sm font-semibold text-gray-600">Cinsiyet</label>

                                        <select value={String(userProps.gender)} className='block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40' onChange={(e: any) => setUserProps({ ...userProps, gender: e.target.value })}>
                                            <option value={String(true)}>Erkek</option>
                                            <option value={String(false)}>Kız</option>
                                        </select>
                                    </div>
                                </div>
                                <div className='flex flex-col justify-center'>
                                    <div className="mb-2 w-full">
                                        <label
                                            form="username"
                                            className="block text-sm font-semibold text-gray-600"
                                        >
                                            Adı
                                        </label>
                                        <input
                                            type="text"
                                            value={userProps.firstName} onChange={e => setUserProps({ ...userProps, firstName: e.target.value })}
                                            className="block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
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
                                            value={userProps.lastName} onChange={e => setUserProps({ ...userProps, lastName: e.target.value })}
                                            className="block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                    <div className="mb-2 w-full">
                                        <label
                                            form="location"
                                            className="block text-sm font-semibold text-gray-600"
                                        >
                                            Lokasyon
                                        </label>
                                        <select value={String(userProps.gender)} className='block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40' onChange={(e: any) => setUserProps({ ...userProps, gender: e.target.value })}>
                                            <option disabled selected> -- Şehir seçiniz -- </option>
                                            {cities.map((city, index) => {
                                                return <option key={index} value={city.plaka}>{city.il_adi}</option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="mb-2 w-full">
                                        <label
                                            form="biography"
                                            className="block text-sm font-semibold text-gray-600"
                                        >
                                            Biyografi
                                        </label>
                                        <textarea
                                            value={userProps.biography} onChange={e => setUserProps({ ...userProps, biography: e.target.value })}
                                            className="block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className='flex flex-col w-full h-full justify-center items-center'>
                            <div className='flex flex-col justify-center'>
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
                                        className="block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
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
                                        className="block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
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
                                        className="block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
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