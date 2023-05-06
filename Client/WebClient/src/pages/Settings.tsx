import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import React, { SelectHTMLAttributes, useEffect, useState } from 'react';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';

import FitzoneHeader from '../components/Header/FitzoneHeader';
import Nav from '../components/Nav/Nav';
import PhotoUpload from '../components/PhotoUpload/PhotoUpload';
import { FitzoneApi } from '../services/fitzoneApi';
import { IUserLicence, UserProps } from '../types/Types';
import { cities } from '../assets/Cities';
import MUIDataGrid from '../components/MUIDataGrid/MUIDataGrid';
import { GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { Button } from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const columns: GridColDef[] = [
    {
        field: 'Name',
        headerName: 'Lisans Adı',
        width: 150,
        editable: true,
        flex: 1,
    },
    {
        field: 'Description',
        headerName: 'Açıklama',
        width: 150,
        editable: true,
        flex: 1,
    },
    {
        field: 'LicenceDate',
        headerName: 'Lisans Tarihi',
        width: 150,
        editable: true,
        flex: 1,
    }
];

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
    const [value, setValue] = useState(0);
    const [firstName, setFirstName] = useState<string>('');
    const [open, setOpen] = useState(false);



    const [userProps, setUserProps] = useState<UserProps>({
        id: "",
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        personalPhoto: '',
        biography: '',
        trainerLicenses: [],
        trainerClubs: [],
    });

    const [userLicence, setUserLicence] = useState<IUserLicence>({
        name: '',
        description: '',
        licenceDate: '',
        id: 0,
        trainerUserId: '',
    });

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setUserProps({...userProps, trainerLicenses: [...userProps.trainerLicenses, userLicence]})
        setOpen(false);
    };

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
                id: response.data.id,
                firstName: response.data.firstName,
                lastName: response.data.lastName,
                username: response.data.userName,
                email: response.data.email,
                personalPhoto: response.data.personalPhoto,
                biography: response.data.biography,
                gender: response.data.gender,
                birthdayDate: response.data.birthdayDate,
                location: response.data.location,
                profession: response.data.profession,
                tckn: response.data.tckn,
                qualification: response.data.qualification,
                trainerCanEdit: response.data.trainerCanEdit,
                trainerClubs: response.data.trainerClubs,
                trainerLicenses: response.data.trainerLicenses,
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
                        <div className='flex flex-col w-full h-full justify-center items-center overflow-y-auto'>
                            <div className='flex items-center gap-x-4'>
                                <PhotoUpload photo={userProps.personalPhoto} />
                                <div>
                                    <label>{!firstName ? userProps.email : userProps.firstName + " " + userProps.lastName}</label>
                                </div>

                            </div>
                            <div className='grid grid-cols-2 md:w-[41.25rem] justify-center items-start gap-x-5 gap-y-2'>
                                <div className="mb-2 w-full">
                                    <label
                                        form="username"
                                        className="block text-sm font-semibold text-gray-600"
                                    >
                                        Kullanıcı Adı
                                    </label>
                                    <input
                                        type="text"
                                        disabled
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
                                        form="tckn"
                                        className="block text-sm font-semibold text-gray-600"
                                    >
                                        T.C Kimlik Numarası
                                    </label>
                                    <input
                                        type="text"
                                        value={userProps.tckn} onChange={e => setUserProps({ ...userProps, tckn: e.target.value })}
                                        className="block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="mb-2 w-full">
                                    <label
                                        form="profession"
                                        className="block text-sm font-semibold text-gray-600"
                                    >
                                        Doğum Tarihi
                                    </label>
                                    <input
                                        type="date"
                                        value={userProps.birthdayDate} onChange={e => { setUserProps({ ...userProps, birthdayDate: e.target.value }) }}
                                        className="block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md cursor-pointer
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
                                    <select value={String(userProps.location)} className='block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40' onChange={(e: any) => setUserProps({ ...userProps, location: e.target.value })}>
                                        <option value={undefined} hidden> -- Şehir seçiniz -- </option>
                                        {cities.map((city, index) => {
                                            return <option key={index} value={city.plaka}>{city.il_adi}</option>
                                        })}
                                    </select>
                                </div>
                                <div className='mb-2 w-full'>
                                    <label
                                        form="gender"
                                        className="block text-sm font-semibold text-gray-600">Cinsiyet</label>

                                    <select value={String(userProps.gender)} className='block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40' onChange={(e: any) => setUserProps({ ...userProps, gender: e.target.value })}>
                                        <option value={undefined} hidden>-- Cinsiyet Seçiniz --</option>
                                        <option value={"male"}>Erkek</option>
                                        <option value={"female"}>Kız</option>
                                    </select>
                                </div>
                                <div className="mb-2 w-full col-span-2">
                                    <label
                                        form="biography"
                                        className="block text-sm font-semibold text-gray-600"
                                    >
                                        Biyografi
                                    </label>
                                    <textarea
                                        value={userProps.biography} onChange={e => setUserProps({ ...userProps, biography: e.target.value })}
                                        className="block w-full px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 md:w-[41.25rem] justify-center items-start gap-x-5 md:mt-4 gap-y-2'>
                                <div className='col-span-2 text-center shadow-[rgba(33,35,38,0.1)_0px_10px_10px_-10px] mb-3'>
                                    <span className='text-sm text-gray-600'>Teknik Bilgiler</span>
                                </div>
                                <div className="mb-2 w-full">
                                    <label
                                        form="profession"
                                        className="block text-sm font-semibold text-gray-600"
                                    >
                                        Uzmanlık Alanı
                                    </label>
                                    <input
                                        type="text"
                                        value={userProps.profession} onChange={e => setUserProps({ ...userProps, profession: e.target.value })}
                                        className="block w-full px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                                <div className="mb-2 w-full">
                                    <label
                                        form="qualification"
                                        className="block text-sm font-semibold text-gray-600"
                                    >
                                        Yeterlilik
                                    </label>
                                    <Rating
                                        className='py-1 mt-2 text-blue-700 bg-white rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40'
                                        name="half-rating" size='large'
                                        defaultValue={userProps.qualification ?? 0}
                                        precision={0.5}
                                        onChange={(e: any) => { setUserProps({ ...userProps, qualification: Number(e.target.value) }) }}
                                    />
                                </div>
                                <div className='col-span-2 mb-2 w-full flex flex-col'>
                                    <div className='flex justify-between py-1 items-center'>
                                        <label
                                            form="userLicences"
                                            className="block text-sm font-semibold text-gray-600"
                                        >
                                            Lisanslar
                                        </label>
                                        <Button variant="outlined" onClick={handleClickOpen}>
                                            Lisans Ekle
                                        </Button>
                                    </div>
                                    <Dialog open={open} onClose={handleClose}>
                                        <DialogTitle>Lisans Bilgileri</DialogTitle>
                                        <DialogContent>
                                            <div className="mb-2 w-full">
                                                <label
                                                    form="licenceName"
                                                    className="block text-sm font-semibold text-gray-600"
                                                >
                                                    Lisans Adı
                                                </label>
                                                <input
                                                    type="text"
                                                    value={userLicence.name} onChange={e => setUserLicence({ ...userLicence, name: e.target.value })}
                                                    className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                />
                                            </div>
                                            <div className="mb-2 w-full">
                                                <label
                                                    form="licenceName"
                                                    className="block text-sm font-semibold text-gray-600"
                                                >
                                                    Açıklama
                                                </label>
                                                <textarea
                                                    value={userLicence.description} onChange={e => setUserLicence({ ...userLicence, description: e.target.value })}
                                                    className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                />
                                            </div>
                                            <div className="mb-2 w-full">
                                                <label
                                                    form="licenceDate"
                                                    className="block text-sm font-semibold text-gray-600"
                                                >
                                                    Lisans Alma Tarihi
                                                </label>
                                                <input
                                                    type="date"
                                                    value={userLicence.licenceDate} onChange={e => { setUserLicence({ ...userLicence, licenceDate: e.target.value }) }}
                                                    className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md cursor-pointer
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                />
                                            </div>
                                        </DialogContent>
                                        <DialogActions>
                                            <Button onClick={handleClose}>Cancel</Button>
                                            <Button onClick={handleClose}>Subscribe</Button>
                                        </DialogActions>
                                    </Dialog>
                                    <MUIDataGrid
                                        onCellEditCommit={(e) => { console.log(e) }}
                                        columns={columns}
                                        rows={userProps.trainerLicenses ?? []}
                                    />
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