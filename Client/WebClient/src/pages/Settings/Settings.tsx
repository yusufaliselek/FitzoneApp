import { Button } from '@mui/material';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating'

import DataTable from 'react-data-table-component';

import { cities } from '../../assets/Cities';
import CustomInput from '../../components/CustomInput';
import FitzoneHeader from '../../components/Header/FitzoneHeader';
import Nav from '../../components/Nav/Nav';
import PhotoUpload from '../../components/PhotoUpload/PhotoUpload';
import { FitzoneApi } from '../../services/fitzoneApi';
import { ITrainerLicence, ITrainerUserProps, ITrainerClub } from '../../types/Types';
import { RiFileUserFill, RiPhoneFill, RiSave3Fill, RiDeleteBin5Line, RiEdit2Line } from 'react-icons/ri';
import IsCanDo from '../../components/IsCanDo/IsCanDo';
import TrainerLicences from './TrainerLicences';
import TrainerClubs from './TrainerClubs';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const columnsLicence = [
    {
        name: 'Lisans Adı',
        selector: (row: ITrainerLicence) => row.name,
    },
    {
        name: 'Açıklama',
        selector: (row: ITrainerLicence) => row.description,
    },
    {
        name: 'Lisans Tarihi',
        selector: (row: ITrainerLicence) => row.licenceDate,
    },
    {
        name: 'İşlemler',
        selector: (row: ITrainerLicence) => row.id,
        cell: (row: ITrainerLicence) => <div className='flex gap-x-4'>
            <div className='hover:bg-gray-300 rounded-full p-2 text-blue-600 hover:text-blue-500 cursor-pointer'>
                <RiEdit2Line size={20} />
            </div>
            <div className='hover:bg-gray-300 rounded-full p-2 text-red-600 hover:text-red-500 cursor-pointer'>
                <RiDeleteBin5Line size={20} />
            </div>
        </div>
    }
];

const columnsClub = [
    {
        name: 'Kulüp Adı',
        selector: (row: ITrainerClub) => row.name,
    },
    {
        name: 'Açıklama',
        selector: (row: ITrainerClub) => row.description,
    },
    {
        name: 'Rol',
        selector: (row: ITrainerClub) => row.role,
    },
    {
        name: 'Giriş Tarihi',
        selector: (row: ITrainerClub) => row.entryDate,
    },
    {
        name: 'Ayrılış Tarihi',
        selector: (row: ITrainerClub) => row.leaveDate,
    },
    {
        name: 'İşlemler',
        selector: (row: ITrainerClub) => row.id,
        cell: (row: ITrainerClub) => <div className='flex gap-x-4'>
            <div className='hover:bg-gray-300 rounded-full p-2 text-blue-600 hover:text-blue-500 cursor-pointer'>
                <RiEdit2Line size={20} />
            </div>
            <div className='hover:bg-gray-300 rounded-full p-2 text-red-600 hover:text-red-500 cursor-pointer'>
                <RiDeleteBin5Line size={20} />
            </div>
        </div>
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
    const [licenceDialog, setLicenceDialog] = useState(false);
    const [clubDialog, setClubDialog] = useState(false);
    const [phoneNumberVisibility, setPhoneNumberVisibility] = useState<boolean>(false);

    const [dialogOpenId, setDialogOpenId] = useState<number>(0);

    const [trainerProps, setUserProps] = useState<ITrainerUserProps>({
        id: "",
        email: '',
        username: '',
        firstName: '',
        lastName: '',
        personalPhoto: '',
        biography: '',
        phoneNumber: '',
        trainerLicences: [],
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

    // Antrenör lisansları

    const clearLicenceDialog = () => {
        return {
            name: '',
            description: '',
            licenceDate: '',
            id: dialogOpenId,
            trainerUserId: '',
        }
    }

    const [trainerLicence, setUserLicence] = useState<ITrainerLicence>(clearLicenceDialog);

    const openLicenceDialog = () => {
        setDialogOpenId(dialogOpenId + 1);
        setLicenceDialog(true);
    };

    const closeLicenceDialog = () => {
        console.log(trainerLicence);
        setLicenceDialog(false);
        if (trainerLicence.name && trainerLicence.description && trainerLicence.licenceDate) {
            setUserProps(prevState => ({
                ...prevState,
                trainerLicences: [...prevState.trainerLicences, { ...trainerLicence, id: dialogOpenId, trainerUserId: trainerProps.id }]
            }));
        }
        setUserLicence(clearLicenceDialog);
    };


    const cancelLicenceDialog = () => {
        setLicenceDialog(false);
        setUserLicence(clearLicenceDialog);
    }

    // Antrenör kulüpleri

    const clearClubDialog = () => {
        return {
            name: '',
            description: '',
            entryDate: '',
            leaveDate: '',
            id: dialogOpenId,
            trainerUserId: '',
            role: ''
        }
    }

    const [trainerClub, setUserClub] = useState<ITrainerClub>(clearClubDialog)

    const openClubDialog = () => {
        setDialogOpenId(dialogOpenId + 1);
        setClubDialog(true);
    };

    const closeClubDialog = () => {
        setClubDialog(false);
        if (trainerClub.name && trainerClub.description && trainerClub.entryDate && trainerClub.leaveDate && trainerClub.role) {
            setUserProps(prevState => ({
                ...prevState,
                trainerClubs: [...prevState.trainerClubs, { ...trainerClub, id: dialogOpenId, trainerUserId: trainerProps.id }]
            }));
        }
        setUserClub(clearClubDialog);
    };


    const cancelClubDialog = () => {
        setClubDialog(false);
        setUserClub(clearClubDialog);
    }


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const saveUserDetails = () => {
        FitzoneApi.UpdateTrainerUser(trainerProps).then((response) => {
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
                phoneNumber: response.data.phoneNumber,
                qualification: response.data.qualification,
                trainerCanEdit: response.data.trainerCanEdit,
                trainerClubs: response.data.trainerClubs ?? [],
                trainerLicences: response.data.trainerLicences ?? [],
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
                            <div className='flex flex-col items-center gap-y-4 my-5'>
                                <PhotoUpload photo={trainerProps.personalPhoto} />
                                <div className='flex gap-x-4'>
                                    <div className='flex gap-x-1 items-center'>
                                        <RiFileUserFill size={20} color='rgba(29,78,216, 0.8)' />
                                        <span>{!firstName ? email : trainerProps.firstName + " " + trainerProps.lastName}</span>
                                    </div>
                                    <div className='flex gap-x-1 items-center'>
                                        <RiPhoneFill size={20} color='rgba(29,78,216, 0.8)' />
                                        <input
                                            type='text'
                                            readOnly={!phoneNumberVisibility}
                                            value={trainerProps.phoneNumber ? trainerProps.phoneNumber : "05** *** ** **"}
                                            onChange={e => setUserProps({ ...trainerProps, phoneNumber: e.target.value })}
                                            onDoubleClick={(e: any) => { setPhoneNumberVisibility(!phoneNumberVisibility) }}
                                            style={{ backgroundColor: 'transparent', border: `${phoneNumberVisibility ? "1px solid lightgray" : "1px solid transparent"}`, outline: 'none', width: "130px" }}
                                        />
                                        <RiSave3Fill
                                            size={20}
                                            color='rgba(29,78,216, 0.8)'
                                            visibility={phoneNumberVisibility ? "visible" : "hidden"}
                                            style={{ cursor: 'pointer' }}
                                            onClick={() => {
                                                setPhoneNumberVisibility(false)
                                            }}
                                        />
                                    </div>
                                </div>

                            </div>
                            <div className='grid grid-cols-2 md:w-[41.25rem] justify-center items-start gap-x-5 gap-y-2'>
                                <CustomInput type='text' formType='text' label='Kullanıcı Adı' value={trainerProps.username} changeFunction={e => setUserProps({ ...trainerProps, username: e.target.value })} isDisabled />
                                <CustomInput type='email' formType='email' label='Email' value={trainerProps.email} changeFunction={e => setUserProps({ ...trainerProps, email: e.target.value })} />
                                <CustomInput type='text' formType='text' label='Adı' value={trainerProps.firstName} changeFunction={e => setUserProps({ ...trainerProps, firstName: e.target.value })} />
                                <CustomInput type='text' formType='text' label='Soyadı' value={trainerProps.lastName} changeFunction={e => setUserProps({ ...trainerProps, lastName: e.target.value })} />
                                <CustomInput type='text' formType='tckn' label='T.C Kimlik Numarası' value={trainerProps.tckn} changeFunction={e => setUserProps({ ...trainerProps, tckn: e.target.value })} />
                                <CustomInput type='date' formType='profession' label='Doğum Tarihi' value={trainerProps.birthdayDate} changeFunction={e => { setUserProps({ ...trainerProps, birthdayDate: e.target.value }) }} />
                                <div className="mb-2 w-full">
                                    <label
                                        form="location"
                                        className="block text-sm font-semibold text-gray-600"
                                    >
                                        Lokasyon
                                    </label>
                                    <select value={String(trainerProps.location)} className='block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40' onChange={(e: any) => setUserProps({ ...trainerProps, location: e.target.value })}>
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

                                    <select value={String(trainerProps.gender)} className='block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40' onChange={(e: any) => setUserProps({ ...trainerProps, gender: e.target.value })}>
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
                                        value={trainerProps.biography} onChange={e => setUserProps({ ...trainerProps, biography: e.target.value })}
                                        className="block w-full px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                            </div>
                            <div className='grid grid-cols-2 md:w-[41.25rem] justify-center items-start gap-x-5 md:mt-6 gap-y-2'>
                                <div className='col-span-2 text-center shadow-[rgba(33,35,38,0.1)_0px_10px_10px_-10px] mb-3'>
                                    <span className='text-sm text-gray-600'>Teknik Bilgiler</span>
                                </div>
                                <CustomInput type='text' formType='profession' label='Uzmanlık Alanı' value={trainerProps.profession} changeFunction={e => setUserProps({ ...trainerProps, profession: e.target.value })} />
                                <div className="mb-2 w-full">
                                    <label
                                        form="qualification"
                                        className="block text-sm font-semibold text-gray-600"
                                    >
                                        Yeterlilik
                                    </label>
                                    <div>
                                        <Rating
                                            titleSeparator='/'
                                            allowFraction={true}
                                            SVGclassName="inline-block"
                                            initialValue={trainerProps.qualification}
                                            onClick={(e) => { setUserProps({ ...trainerProps, qualification: e }) }}
                                        />
                                    </div>
                                </div>
                                <TrainerLicences
                                    columns={columnsLicence}
                                    licenceDialog={licenceDialog}
                                    rowsConsole={rowsConsole}
                                    openLicenceDialog={openLicenceDialog}
                                    closeLicenceDialog={closeLicenceDialog}
                                    cancelLicenceDialog={cancelLicenceDialog}
                                    trainerLicences={trainerProps.trainerLicences}
                                    trainerLicence={trainerLicence}
                                    setUserLicence={setUserLicence}
                                    paginationComponentOptions={paginationComponentOptions}
                                    trainerProps={trainerProps}

                                />
                                <TrainerClubs
                                    columns={columnsClub}
                                    clubDialog={clubDialog}
                                    rowsConsole={rowsConsole}
                                    openClubDialog={openClubDialog}
                                    closeClubDialog={closeClubDialog}
                                    cancelClubDialog={cancelClubDialog}
                                    trainerClub={trainerClub}
                                    setUserClub={setUserClub}
                                    paginationComponentOptions={paginationComponentOptions}
                                    trainerProps={trainerProps}
                                />
                            </div>
                            <Button variant="outlined" onClick={saveUserDetails}>
                                Bilgileri Kaydet
                            </Button>
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
                                        value={trainerProps.currentPassword} onChange={e => setUserProps({ ...trainerProps, currentPassword: e.target.value })}
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
                                        value={trainerProps.newPassword} onChange={e => setUserProps({ ...trainerProps, newPassword: e.target.value })}
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
                                        value={trainerProps.newPasswordConfirm} onChange={e => setUserProps({ ...trainerProps, newPasswordConfirm: e.target.value })}
                                        className="block w-[20rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                    />
                                </div>
                            </div>

                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div className='flex flex-col w-full h-full items-center gap-y-2'>
                            {/*trainer have permissions*/}
                            <IsCanDo text='Yeni Kullanıcı Ekleyebilir' display={Boolean(trainerProps.trainerCanEdit?.canAddMember)} />
                            <IsCanDo text='Yeni Kullanıcı Ekleyebilir' display={Boolean(trainerProps.trainerCanEdit?.canAddTrainerUser)} />
                            <IsCanDo text='Yeni Kullanıcı Ekleyebilir' display={Boolean(trainerProps.trainerCanEdit?.canDefineProgram)} />
                            <IsCanDo text='Yeni Kullanıcı Ekleyebilir' display={Boolean(trainerProps.trainerCanEdit?.canAddMember)} />
                            <IsCanDo text='Yeni Kullanıcı Ekleyebilir' display={Boolean(trainerProps.trainerCanEdit?.canAddMember)} />
                            <IsCanDo text='Yeni Kullanıcı Ekleyebilir' display={Boolean(!trainerProps.trainerCanEdit?.canAddMember)} />
                        </div>
                    </TabPanel>
                </Box>
            </div>
        </div >
    )
}

export default Settings