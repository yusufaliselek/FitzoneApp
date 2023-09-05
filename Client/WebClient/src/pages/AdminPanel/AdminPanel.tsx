import React, { useState, useEffect } from 'react';
import Nav from '../../components/Nav/Nav';
import FitzoneHeader from '../../components/Header/FitzoneHeader';
import { Box, Checkbox, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, Tab, Tabs, Tooltip, DialogContentText, TextField } from '@mui/material';
import { FitzoneApi } from '../../services/fitzoneApi';
import { IGetTrainerPermissionById } from '../../types/Types';
import { DataGrid, GridCloseIcon, GridColDef, trTR } from '@mui/x-data-grid';
import TextInput from '../../components/TextInput/TextInput';
import FButton from '../../components/Button/FButton';
import { TabPanel, a11yProps } from '../../utils/funcs/TabPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Toast from '../../components/Toast/Toast';
import { AiFillDelete, AiOutlineCloseCircle } from 'react-icons/ai';
import { BiCheckbox, BiCheckboxChecked, BiShow, BiUserCheck } from 'react-icons/bi';
import { decodeJwt } from 'jose';
import Swal from 'sweetalert2';
import PassiveTrainers from './PassiveTrainers';
import TrainerPermissions from './TrainerPermissions';

const trainerPermissionParamCheckboxes = [
    'canCreateUser', 'canEditUser', 'canDeleteUser', 'canCreateRole', 'canEditRole',
    'canDeleteRole', 'canCreateTraining', 'canEditTraining', 'canDeleteTraining',
    'canCreateTrainingCategory', 'canEditTrainingCategory', 'canDeleteTrainingCategory',
    'canCreateMember', 'canEditMember', 'canDeleteMember', 'canSetRole'
];

const trainerPermissionParamLabels = [
    'Kullanıcı Oluşturabilir', 'Kullanıcı Düzenleyebilir', 'Kullanıcı Silebilir', 'Rol Oluşturabilir', 'Rol Düzenleyebilir',
    'Rol Silebilir', 'Eğitim Oluşturabilir', 'Eğitim Düzenleyebilir', 'Eğitim Silebilir', 'Eğitim Kategorisi Oluşturabilir',
    'Eğitim Kategorisi Düzenleyebilir', 'Eğitim Kategorisi Silebilir', 'Üye Oluşturabilir', 'Üye Düzenleyebilir',
    'Üye Silebilir', 'Rol Atayabilir'
];

const trainerPermissionParams: IGetTrainerPermissionById = {
    id: '',
    name: '',
    canCreateUser: false,
    canEditUser: false,
    canDeleteUser: false,
    canCreateRole: false,
    canEditRole: false,
    canDeleteRole: false,
    canCreateTraining: false,
    canEditTraining: false,
    canDeleteTraining: false,
    canCreateTrainingCategory: false,
    canEditTrainingCategory: false,
    canDeleteTrainingCategory: false,
    canCreateMember: false,
    canEditMember: false,
    canDeleteMember: false,
    canSetRole: false,
};

const AdminPanel = () => {

    // Default State
    const navigate = useNavigate();
    const [value, setValue] = useState(0);

    // Register Users State
    const [registerUsers, setRegisterUsers] = useState<any[]>([]);

    // Freeze Trainer States
    const [passiveTrainers, setPassiveTrainers] = useState<any[]>([]);

    // Freeze Member States
    const [passiveMembers, setPassiveMembers] = useState<any[]>([]);

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
        getAllPassiveMembers();
        getRegisterUsers();
    }, []);


    ////////////////////////////////
    // Passive Members Functions //
    ///////////////////////////////
    const getAllPassiveMembers = () => {
        FitzoneApi.GetAllPassiveMembers().then(res => {
            setPassiveMembers(res.data);
        })
    }

    const deleteMember = (id: string) => {
        Swal.fire({
            title: 'Üyeyi silmek istediğinizden emin misiniz?',
            text: passiveMembers.filter(item => item.id === id)[0].email + " - " + passiveMembers.filter(item => item.id === id)[0].userName,
            showDenyButton: true,
            confirmButtonText: `Sil`,
            denyButtonText: `Vazgeç`,
            confirmButtonColor: '#dc3545',
            denyButtonColor: '#6c757d',
        }).then((result) => {
            if (result.isConfirmed) {
                FitzoneApi.DeleteMemberDetailByMemberId(id).then(res => {
                    FitzoneApi.DeleteMember(id).then(res => {
                        Toast.fire({
                            icon: 'success',
                            title: 'Üye silindi'
                        });
                        getAllPassiveMembers();
                    })
                }).catch(err => {
                    if (err.errors[0] == "Member detail not found!") {
                        FitzoneApi.DeleteMember(id).then(res => {
                            Toast.fire({
                                icon: 'success',
                                title: 'Üye silindi'
                            });
                            getAllPassiveMembers();
                        })
                        return;
                    }
                    Toast.fire({
                        icon: 'error',
                        title: 'Üye silinemedi'
                    });
                });
            } else if (result.isDenied) {
                return;
            }
        })
    }

    const unFreezeMember = (id: string) => {
        Swal.fire({
            title: 'Aktif etmek istediğinizden emin misiniz?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Evet, aktif et!',
            cancelButtonText: 'Hayır'
        }).then((result) => {
            if (result.isConfirmed) {
                Toast.fire({
                    icon: 'info',
                    title: 'Üye aktif ediliyor...'
                });
                FitzoneApi.UnFreezeMember(id).then(res => {
                    console.log(res);
                    Toast.fire({
                        icon: 'success',
                        title: 'Üye aktif edildi'
                    });
                    getAllPassiveMembers();
                }).catch((error) => {
                    console.log(error);
                    Toast.fire({
                        icon: 'error',
                        title: 'Üye aktif edilemedi'
                    });
                })
            }
        })
    }

    const freezeMemberColumns: GridColDef[] = [
        {
            field: 'userName',
            headerName: 'Kullanıcı Adı',
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'firstName',
            headerName: 'Ad',
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'lastName',
            headerName: 'Soyad',
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 300,
            flex: 1,
        },
        {
            field: 'phoneNumber',
            headerName: 'Telefon',
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'id',
            headerName: 'İşlemler',
            flex: 1,
            minWidth: 200,
            align: 'right',
            headerAlign: 'right',
            renderCell: (params) => (
                <div className='flex gap-3 pr-2'>
                    <Tooltip title="Üye Detayı">
                        <button onClick={() => navigate(`/members/${params.value}`)} className='flex items-center justify-center p-2 rounded-full text-blue-400 hover:bg-gray-300 hover:text-blue-500 transition-all'>
                            <BiShow className='w-5 h-5' />
                        </button>
                    </Tooltip>
                    <Tooltip title="Üyeyi Aktif Et">
                        <button onClick={() => unFreezeMember(params.value)} className='flex items-center justify-center p-2 rounded-full text-green-600 hover:bg-gray-300 hover:text-green-700 transition-all'>
                            <BiUserCheck className='w-5 h-5' />
                        </button>
                    </Tooltip>
                    <Tooltip title="Üyeyi Sil">
                        <button onClick={() => deleteMember(params.value)} className='flex items-center justify-center p-2 rounded-full text-red-400 hover:bg-gray-300 hover:text-red-500 transition-all'>
                            <AiFillDelete className='w-5 h-5' />
                        </button>
                    </Tooltip>
                </div>
            )
        }
    ];


    ////////////////////////////////
    /// Register Users Functions ///
    ////////////////////////////////

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const columnsRegisterUsers: GridColDef[] = [
        {
            field: 'userName',
            headerName: 'Kullanıcı Adı',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'email',
            headerName: 'E-posta',
            flex: 1,
            minWidth: 200,
        },
        {
            headerName: 'İşlemler',
            field: 'id',
            flex: 1,
            minWidth: 200,
            align: 'right',
            headerAlign: 'right',
            renderCell: (params) => (
                <div className='flex gap-3 pr-2'>
                    <Tooltip title="Üyeyi Aktif Et">
                        <button onClick={() => handleClickOpen()} className='flex items-center justify-center p-2 rounded-full text-green-600 hover:bg-gray-300 hover:text-green-700 transition-all'>
                            <BiUserCheck className='w-5 h-5' />
                        </button>
                    </Tooltip>
                    <Tooltip title="Üyeyi Sil">
                        <button onClick={() => handleClickOpen()} className='flex items-center justify-center p-2 rounded-full text-red-400 hover:bg-gray-300 hover:text-red-500 transition-all'>
                            <AiFillDelete className='w-5 h-5' />
                        </button>
                    </Tooltip>
                </div>
            )
        }
    ]


    const getRegisterUsers = () => {
        FitzoneApi.GetRegisterUsers().then(res => {
            setRegisterUsers(res.data);
        })
    }

    return (
        <div className='flex w-screen h-screen overflow-hidden'>
            {/* Navbar */}
            <Nav pageName='' />
            <div className='flex flex-col w-full h-screen'>
                {/* Header */}
                <FitzoneHeader pageName='Admin Paneli' />
                <Box sx={{ width: '100%', paddingX: 2, height: "calc(100vh-112px)" }}>
                    <Tabs value={value} onChange={handleChangeTabs}>
                        <Tab label="Yetki Altyapısı" {...a11yProps(0)} />
                        <Tab label="Dondurulmuş Antrenörler" {...a11yProps(1)} />
                        <Tab label="Dondurulmuş Üyeler" {...a11yProps(2)} />
                        <Tab label="Kayıt Bekleyen Kullanıcılar" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <TrainerPermissions />
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <PassiveTrainers />
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div className='flex justify-center items-center w-full h-[calc(100vh-120px)] mt-1'>
                            <DataGrid rows={passiveMembers} columns={freezeMemberColumns} localeText={trTR.components.MuiDataGrid.defaultProps.localeText} />
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <div className='flex justify-center items-center w-full h-[calc(100vh-120px)] mt-1'>
                            <DataGrid rows={registerUsers} columns={columnsRegisterUsers} localeText={trTR.components.MuiDataGrid.defaultProps.localeText} />
                            <div>
                                <Dialog open={open} onClose={handleClose}>
                                    <DialogTitle>Subscribe</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                            To subscribe to this website, please enter your email address here. We
                                            will send updates occasionally.
                                        </DialogContentText>
                                        <TextField
                                            autoFocus
                                            margin="dense"
                                            id="name"
                                            label="Email Address"
                                            type="email"
                                            fullWidth
                                            variant="standard"
                                        />
                                    </DialogContent>
                                    <DialogActions>
                                        <Button onClick={handleClose}>Cancel</Button>
                                        <Button onClick={handleClose}>Subscribe</Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </TabPanel>
                </Box>
            </div>
        </div>
    );
};

export default AdminPanel;
