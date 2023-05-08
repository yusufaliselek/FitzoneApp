import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { GridColDef } from '@mui/x-data-grid';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import DataTable from 'react-data-table-component';

import { cities } from '../assets/Cities';
import CustomInput from '../components/CustomInput';
import FitzoneHeader from '../components/Header/FitzoneHeader';
import MUIDataGrid from '../components/MUIDataGrid/MUIDataGrid';
import Nav from '../components/Nav/Nav';
import PhotoUpload from '../components/PhotoUpload/PhotoUpload';
import { FitzoneApi } from '../services/fitzoneApi';
import { IUserLicence, ITrainerUserProps } from '../types/Types';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import IsCanDo from '../components/IsCanDo/IsCanDo';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const columns = [
    {
        name: 'Lisans Adı',
        selector: (row: any) => row.name,
    },
    {
        name: 'Açıklama',
        selector: (row: any) => row.description,
    },
    {
        name: 'Lisans Tarihi',
        selector: (row: any) => row.licenceDate,
    },
    {
        name: 'İşlemler',
        selector: (row: any) => row.id,
        cell: (row: any) => <Button variant="contained" color="error" onClick={() => console.log(row)}>Sil</Button>
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

    const rowsConsole = ({ selectedRows }: { selectedRows: any }) => {
        // You can set state or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', selectedRows);
    };

    const navigate = useNavigate()
    const [value, setValue] = useState(0);
    const [firstName, setFirstName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [open, setOpen] = useState(false);

    const [dialogOpenId, setDialogOpenId] = useState<number>(0);

    const [userProps, setUserProps] = useState<ITrainerUserProps>({
        id: "",
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        personalPhoto: '',
        biography: '',
        trainerLicenses: [],
        trainerClubs: [],
        trainerCanEdit: {
            canAddMember: false,
            canAddTraining: false,
            canDeleteMember: false,
            canDeleteTraining: false,
            canEditMember: false,
            canEditTraining: false,
            canAddTrainerUser: false,
            canDeleteTrainerUser: false,
            canEditTrainerUser: false,
            canDefineProgram: false,
            isFounder: false,
            trainerUserId: '',
            id: 0
        }
    });

    const [userLicence, setUserLicence] = useState<IUserLicence>({
        name: '',
        description: '',
        licenceDate: '',
        id: dialogOpenId,
        trainerUserId: '',
    });



    const handleClickOpen = () => {
        setDialogOpenId(dialogOpenId + 1);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        if (userLicence.name && userLicence.description && userLicence.licenceDate) {
            setUserProps(prevState => ({
                ...prevState,
                trainerLicenses: [...prevState.trainerLicenses, { ...userLicence, id: dialogOpenId, trainerUserId: userProps.id }]
            }));
        }
        setUserLicence({
            name: '',
            description: '',
            licenceDate: '',
            id: dialogOpenId,
            trainerUserId: '',
        });
    };


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const saveUserDetails = () => {
        FitzoneApi.UpdateTrainerUser(userProps).then((response) => {
            alert(JSON.stringify(response.data))
        })
    }

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
                trainerClubs: response.data.trainerClubs ?? [],
                trainerLicenses: response.data.trainerLicenses ?? [],
            });

            setUserLicence({
                name: '',
                description: '',
                licenceDate: '',
                id: dialogOpenId,
                trainerUserId: response.data.id,
            });

            const firstName = response.data.firstName
            const email = response.data.email

            setEmail(email)
            setFirstName(firstName)
        })
    }

    const paginationComponentOptions = {
        rowsPerPageText: 'Sayfa başına satır',
        rangeSeparatorText: '/',
    };

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
                                    <label>{!firstName ? email : userProps.firstName + " " + userProps.lastName}</label>
                                </div>

                            </div>
                            <div className='grid grid-cols-2 md:w-[41.25rem] justify-center items-start gap-x-5 gap-y-2'>
                                <CustomInput type='text' formType='text' label='Kullanıcı Adı' value={userProps.username} changeFunction={e => setUserProps({ ...userProps, username: e.target.value })} isDisabled />
                                <CustomInput type='email' formType='email' label='Email' value={userProps.email} changeFunction={e => setUserProps({ ...userProps, email: e.target.value })} />
                                <CustomInput type='text' formType='text' label='Adı' value={userProps.firstName} changeFunction={e => setUserProps({ ...userProps, firstName: e.target.value })} />
                                <CustomInput type='text' formType='text' label='Soyadı' value={userProps.lastName} changeFunction={e => setUserProps({ ...userProps, lastName: e.target.value })} />
                                <CustomInput type='text' formType='tckn' label='T.C Kimlik Numarası' value={userProps.tckn} changeFunction={e => setUserProps({ ...userProps, tckn: e.target.value })} />
                                <CustomInput type='date' formType='profession' label='Doğum Tarihi' value={userProps.birthdayDate} changeFunction={e => { setUserProps({ ...userProps, birthdayDate: e.target.value }) }} />
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
                                <CustomInput type='text' formType='profession' label='Uzmanlık Alanı' value={userProps.profession} changeFunction={e => setUserProps({ ...userProps, profession: e.target.value })} />
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
                                            <Button onClick={handleClose}>İptal</Button>
                                            <Button onClick={handleClose}>Ekle</Button>
                                        </DialogActions>
                                    </Dialog>
                                    <DataTable
                                        columns={columns}
                                        data={userProps.trainerLicenses ?? []}
                                        selectableRows
                                        pagination
                                        highlightOnHover
                                        pointerOnHover
                                        onSelectedRowsChange={rowsConsole}
                                        paginationComponentOptions={paginationComponentOptions}
                                    />
                                    <div className='flex justify-end py-1 text-right cursor-pointer w-full ' onClick={saveUserDetails}>
                                        <span className=' hover:bg-slate-500 hover:text-fuchsia-900'>

                                            Kaydet
                                        </span>
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
                        <div className='flex flex-col w-full h-full items-center gap-y-2'>
                            {/*user have permissions*/}
                            <IsCanDo text='Yeni Kullanıcı Ekleyebilir' />
                            <IsCanDo text='Yeni Kullanıcı Ekleyebilir' />
                            <IsCanDo text='Yeni Kullanıcı Ekleyebilir' />
                            <IsCanDo text='Yeni Kullanıcı Ekleyebilir' />
                            <IsCanDo text='Yeni Kullanıcı Ekleyebilir' />
                            <IsCanDo text='Yeni Kullanıcı Ekleyebilir' />
                        </div>
                    </TabPanel>
                </Box>
            </div>
        </div >
    )
}

export default Settings