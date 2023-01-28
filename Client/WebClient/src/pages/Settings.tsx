import React, { useState } from 'react'
import Header from '../components/Header/Header'
import Nav from '../components/Nav/Nav'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

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

function submitForm({ name, value }: { name: string, value: string }) {
    alert(name + " " + value)
}

const Settings = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    return (
        <div className='flex w-screen h-screen'>
            {/* Navbar */}
            <Nav pageName='Ayarlar' />
            <div className='flex flex-col w-full h-screen'>
                {/* Header */}
                <Header pageName='Ayarlar' />
                <Box sx={{ width: '100%', paddingX: 2 }}>
                    <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                        <Tab label="Kullanıcı Bilgisi" {...a11yProps(0)} />
                        <Tab label="Güvenlik" {...a11yProps(1)} />
                        <Tab label="Bildirimler" {...a11yProps(2)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <div className="mb-2">
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
                        <div className="mb-2">
                            <label
                                form="email"
                                className="block text-sm font-semibold text-gray-600"
                            >
                                Email
                            </label>
                            <input
                                type="text"
                                value={email} onChange={e => setEmail(e.target.value)}
                                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <button onClick={() => submitForm({ name: username, value: email })}>
                            Ekle
                        </button>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Item Two
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