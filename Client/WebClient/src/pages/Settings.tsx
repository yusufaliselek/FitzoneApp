import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { RiAccountCircleLine } from 'react-icons/ri';
import DefaultHeader from '../components/Header/DefaultHeader';
import Nav from '../components/Nav/Nav';

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
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [biography, setBiography] = useState('');
    return (
        <div className='flex w-screen h-screen'>
            {/* Navbar */}
            <Nav pageName='Ayarlar' />
            <div className='flex flex-col w-full h-screen'>
                {/* Header */}
                <DefaultHeader pageName='Ayarlar' DefaultName='Yusuf Ali Selek' DefaultIcon={<RiAccountCircleLine className='h-8 w-8' />} />
                <Box sx={{ width: '100%', paddingX: 2 }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Antrenör Bilgisi" {...a11yProps(0)} />
                        <Tab label="Güvenlik" {...a11yProps(1)} />
                        <Tab label="Bildirimler" {...a11yProps(2)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <div className='flex h-auto justify-center'>
                            <div className='flex flex-col w-1/2 pr-5 gap-y-2'>
                                <p className='text-sm text-gray-600 pb-1 border-b'>Hesap Bilgileri</p>
                                <div className="mb-2 w-full">
                                    <label
                                        form="username"
                                        className="block text-sm font-semibold text-gray-600"
                                    >
                                        Kullanıcı Adı
                                    </label>
                                    <input
                                        type="text"
                                        value={username} onChange={e => setUsername(e.target.value)}
                                        className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                            </div>
                            <div className='flex flex-col w-1/2 pl-5 gap-y-2'>
                                <p className='text-sm text-gray-600 pb-1 border-b'>Kişisel Bilgiler</p>
                                <div className="mb-2 w-full">
                                    <label
                                        form="username"
                                        className="block text-sm font-semibold text-gray-600"
                                    >
                                        Adı
                                    </label>
                                    <input
                                        type="text"
                                        value={username} onChange={e => setUsername(e.target.value)}
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
                                        value={username} onChange={e => setUsername(e.target.value)}
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
                                        value={biography} onChange={e => setBiography(e.target.value)}
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
                                    form="password"
                                    className="block text-sm font-semibold text-gray-600"
                                >
                                    Şifre
                                </label>
                                <input
                                    type="password"
                                    spellCheck='true'
                                    value={password} onChange={e => setPassword(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                        </div>

                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Item Three
                    </TabPanel>
                </Box>

            </div>
        </div >
    )
}

export default Settings