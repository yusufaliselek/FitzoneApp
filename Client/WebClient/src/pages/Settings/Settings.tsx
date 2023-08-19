import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Rating } from 'react-simple-star-rating';

import CustomInput from '../../components/CustomInput';
import FitzoneHeader from '../../components/Header/FitzoneHeader';
import IsCanDo from '../../components/IsCanDo/IsCanDo';
import Nav from '../../components/Nav/Nav';
import Spinner from '../../components/Spinner/Spinner';
import { FitzoneApi } from '../../services/fitzoneApi';
import { ITrainerClub, ITrainerLicence, ITrainerUserProps } from '../../types/Types';
import TrainerClubs from './TrainerClubs';
import TrainerLicences from './TrainerLicences';
import UserPersonalInfos from './TrainerPersonalInfos';
import { RiDeleteBin5Line, RiEdit2Line } from 'react-icons/ri';
import withReactContent from 'sweetalert2-react-content';
import Swal from 'sweetalert2';
import NoDataComponent from '../../components/NoDataComponent/NoDataComponent';
import DataTable from 'react-data-table-component';

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
    const [clubEditDialog, setClubEditDialog] = useState(false);
    const [phoneNumberVisibility, setPhoneNumberVisibility] = useState<boolean>(false);

    const [dialogOpenId, setDialogOpenId] = useState<number>(Number(0));

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
        setDialogOpenId(dialogOpenId + trainerProps.trainerLicences.length * 100);
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
        setClubEditDialog(false);
        setUserClub(clearClubDialog());
    };

    const cancelClubEditDialog = () => {
        setClubEditDialog(false);
        setUserClub(clearClubDialog());
    };


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
            name: 'İşlemler',
            selector: (row: ITrainerClub) => row.id,
            cell: (row: ITrainerClub) => <div className='flex gap-x-4'>
                <div className='hover:bg-gray-300 rounded-full p-2 text-blue-600 hover:text-blue-500 cursor-pointer' onClick={() => {
                    setUserClub(row)
                    setClubEditDialog(true)
                }}>
                    <RiEdit2Line size={20} />
                </div>
                <div className='hover:bg-gray-300 rounded-full p-2 text-red-600 hover:text-red-500 cursor-pointer' onClick={() => {
                    console.log(trainerProps);
                    ToastConfirm.fire({
                        icon: "warning",
                        title: "Kulübü silmek istediğinize emin misiniz?"
                    }).then((result) => {
                        setUserProps({
                            ...trainerProps,
                            trainerClubs: trainerProps?.trainerClubs.filter(x => x.id !== row.id)
                        });
                        if (result.isConfirmed) {
                            Toast.fire({
                                icon: "info",
                                title: "Kulüp silindi"
                            });
                        }
                    });
                }}>
                    <RiDeleteBin5Line size={20} />
                </div>
            </div>
        }
    ];

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
                        {
                            trainerProps.id ?
                                <div className='flex flex-col w-full h-full justify-center items-center overflow-y-auto'>
                                    <UserPersonalInfos
                                        email={email}
                                        firstName={firstName}
                                        phoneNumberVisibility={phoneNumberVisibility}
                                        setPhoneNumberVisibility={setPhoneNumberVisibility}
                                        setUserProps={setUserProps}
                                        trainerProps={trainerProps}
                                    />
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
                                        {/* <TrainerClubs
                                            columnsClub={columnsClub}
                                            setUserProps={setUserProps}
                                            clubDialog={clubDialog}
                                            rowsConsole={rowsConsole}
                                            openClubDialog={openClubDialog}
                                            closeClubDialog={closeClubDialog}
                                            cancelClubDialog={cancelClubDialog}
                                            trainerClub={trainerClub}
                                            setUserClub={setUserClub}
                                            paginationComponentOptions={paginationComponentOptions}
                                            trainerProps={trainerProps}
                                        /> */}
                                        <div className='col-span-2 mb-2 w-full flex flex-col'>
                                            <div className='flex justify-between py-1 items-center'>
                                                <label
                                                    form="trainerClubs"
                                                    className="block text-sm font-semibold text-gray-600"
                                                >
                                                    Kulüpler
                                                </label>
                                                <Button variant="outlined" onClick={openClubDialog}>
                                                    Kulüp Ekle
                                                </Button>
                                            </div>
                                            <Dialog open={clubDialog} onClose={closeClubDialog}>
                                                <DialogTitle>Kulüp Bilgileri</DialogTitle>
                                                <DialogContent>
                                                    <div className="mb-2 w-full">
                                                        <label
                                                            form="clubName"
                                                            className="block text-sm font-semibold text-gray-600"
                                                        >
                                                            Kulüp Adı
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={trainerClub.name} onChange={e => setUserClub({ ...trainerClub, name: e.target.value })}
                                                            className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                        />
                                                    </div>
                                                    <div className="mb-2 w-full">
                                                        <label
                                                            form="role"
                                                            className="block text-sm font-semibold text-gray-600"
                                                        >
                                                            Kulüpteki Rol
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={trainerClub.role} onChange={e => setUserClub({ ...trainerClub, role: e.target.value })}
                                                            className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                        />
                                                    </div>
                                                    <div className="mb-2 w-full">
                                                        <label
                                                            form="clubDescription"
                                                            className="block text-sm font-semibold text-gray-600"
                                                        >
                                                            Açıklama
                                                        </label>
                                                        <textarea
                                                            value={trainerClub.description} onChange={e => setUserClub({ ...trainerClub, description: e.target.value })}
                                                            className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                        />
                                                    </div>
                                                    <div className="mb-2 w-full">
                                                        <label
                                                            form="clubEnterDate"
                                                            className="block text-sm font-semibold text-gray-600"
                                                        >
                                                            Kulübe Giriş Tarihi
                                                        </label>
                                                        <input
                                                            type="date"
                                                            value={trainerClub.entryDate} onChange={e => { setUserClub({ ...trainerClub, entryDate: e.target.value }) }}
                                                            className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md cursor-pointer
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                        />
                                                    </div>
                                                    <div className="mb-2 w-full">
                                                        <label
                                                            form="clubExitDate"
                                                            className="block text-sm font-semibold text-gray-600"
                                                        >
                                                            Kulüpten Ayrılma Tarihi
                                                        </label>
                                                        <input
                                                            type="date"
                                                            value={trainerClub.leaveDate} onChange={e => { setUserClub({ ...trainerClub, leaveDate: e.target.value }) }}
                                                            className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md cursor-pointer
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                        />
                                                    </div>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={cancelClubDialog}>İptal</Button>
                                                    <Button onClick={closeClubDialog}>Ekle</Button>
                                                </DialogActions>
                                            </Dialog>
                                            <Dialog open={clubEditDialog} onClose={() => console.log("a")}>
                                                <DialogTitle>Kulüp Bilgilerini Düzenleyin</DialogTitle>
                                                <DialogContent>
                                                    <div className="mb-2 w-full">
                                                        <label
                                                            form="clubName"
                                                            className="block text-sm font-semibold text-gray-600"
                                                        >
                                                            Kulüp Adı
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={trainerClub.name} onChange={e => setUserClub({ ...trainerClub, name: e.target.value })}
                                                            className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                        />
                                                    </div>
                                                    <div className="mb-2 w-full">
                                                        <label
                                                            form="role"
                                                            className="block text-sm font-semibold text-gray-600"
                                                        >
                                                            Kulüpteki Rol
                                                        </label>
                                                        <input
                                                            type="text"
                                                            value={trainerClub.role} onChange={e => setUserClub({ ...trainerClub, role: e.target.value })}
                                                            className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                        />
                                                    </div>
                                                    <div className="mb-2 w-full">
                                                        <label
                                                            form="clubDescription"
                                                            className="block text-sm font-semibold text-gray-600"
                                                        >
                                                            Açıklama
                                                        </label>
                                                        <textarea
                                                            value={trainerClub.description} onChange={e => setUserClub({ ...trainerClub, description: e.target.value })}
                                                            className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                        />
                                                    </div>
                                                    <div className="mb-2 w-full">
                                                        <label
                                                            form="clubEnterDate"
                                                            className="block text-sm font-semibold text-gray-600"
                                                        >
                                                            Kulübe Giriş Tarihi
                                                        </label>
                                                        <input
                                                            type="date"
                                                            value={trainerClub.entryDate} onChange={e => { setUserClub({ ...trainerClub, entryDate: e.target.value }) }}
                                                            className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md cursor-pointer
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                        />
                                                    </div>
                                                    <div className="mb-2 w-full">
                                                        <label
                                                            form="clubExitDate"
                                                            className="block text-sm font-semibold text-gray-600"
                                                        >
                                                            Kulüpten Ayrılma Tarihi
                                                        </label>
                                                        <input
                                                            type="date"
                                                            value={trainerClub.leaveDate} onChange={e => { setUserClub({ ...trainerClub, leaveDate: e.target.value }) }}
                                                            className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md cursor-pointer
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                                        />
                                                    </div>
                                                </DialogContent>
                                                <DialogActions>
                                                    <Button onClick={cancelClubEditDialog}>İptal</Button>
                                                    <Button onClick={() => console.log("a")}>Kaydet</Button>
                                                </DialogActions>
                                            </Dialog>
                                            <DataTable
                                                noDataComponent={<NoDataComponent text='Kulüp Bulunamadı' />}
                                                columns={columnsClub}
                                                data={trainerProps.trainerClubs ?? []}
                                                selectableRows
                                                pagination
                                                highlightOnHover
                                                onSelectedRowsChange={rowsConsole}
                                                paginationComponentOptions={paginationComponentOptions}
                                            />
                                        </div>
                                    </div>
                                    <Button variant="outlined" onClick={saveUserDetails}>
                                        Bilgileri Kaydet
                                    </Button>
                                </div>
                                :
                                <div>
                                    <Spinner color='lightgray' />
                                </div>
                        }

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
                            <IsCanDo text='Yeni Kullanıcı Ekleyebilir' display={Boolean(!trainerProps.trainerCanEdit?.canAddMember)} />
                        </div>
                    </TabPanel>
                </Box>
            </div>
        </div >
    )
}

export default Settings