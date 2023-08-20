import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FitzoneHeader from '../../components/Header/FitzoneHeader';
import Nav from '../../components/Nav/Nav';
import { FitzoneApi } from '../../services/fitzoneApi';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import { BsPersonCircle } from 'react-icons/bs';
import { decodeJwt } from 'jose';
import TextInput from '../../components/TextInput';

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
                <Box>
                    <div>{children}</div>
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

const trainerParams = {
    biography: "",
    birthdayDate: "",
    createdAt: "",
    email: "",
    firstName: "",
    gender: "",
    id: "",
    lastName: "",
    location: "",
    personalPhoto: "",
    phoneNumber: "",
    profession: "",
    role: "",
    tckn: "",
    userName: "",
}

const Settings = () => {

    const navigate = useNavigate()
    const goLogin = () => navigate('/login')

    const [value, setValue] = useState(0);
    const [trainer, setTrainer] = useState(trainerParams);


    const MySwal = withReactContent(Swal);
    const ToastConfirm = MySwal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: "Hayır",
        confirmButtonText: "Evet",
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
        didClose: () => {
            console.log("toast closed");
        }
    });

    const Toast = MySwal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener("mouseenter", Swal.stopTimer);
            toast.addEventListener("mouseleave", Swal.resumeTimer);
        }
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
                goLogin();
                console.log("Token süresi dolmuş");
            });
        }
    }

    const clearToken = () => {
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        goLogin();
    }

    const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrainer({ ...trainer, [event.target.id]: event.target.value });
    }

    useEffect(() => {
        RefreshToken()
        const token = Cookies.get('token');
        if (!token) {
            goLogin();
            return;
        }
        const id = decodeJwt(token).sub;
        if (!id) {
            goLogin();
            return;
        }
        FitzoneApi.GetUserById(id).then((response) => {
            response.data.role !== "trainer" ?
                clearToken()
                :
                setTrainer(response.data)
        })

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
                        <div className='w-full h-[calc(100vh-112px)] overflow-y-auto flex flex-col gap-2 items-center'>
                            <div className='mt-3'>
                                <BsPersonCircle size={40} color='lightgray' />
                            </div>
                            <div className='flex flex-col w-2/3 gap-3 mt-6'>
                                <div className='flex gap-2'>
                                    <TextInput label='Ad' value={trainer.firstName} id={trainer.firstName} onChange={handleChangeForm} />
                                    <TextInput label='Soyad' value={trainer.lastName} id={trainer.lastName} onChange={handleChangeForm} />
                                </div>
                            </div>
                        </div>


                    </TabPanel>
                    <TabPanel value={value} index={1}>

                    </TabPanel>
                    <TabPanel value={value} index={2}>

                    </TabPanel>
                </Box>
            </div>
        </div >
    )
}

export default Settings