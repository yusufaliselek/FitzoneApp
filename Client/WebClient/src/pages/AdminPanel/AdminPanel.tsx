import React, { useState, useEffect } from 'react';
import Nav from '../../components/Nav/Nav';
import FitzoneHeader from '../../components/Header/FitzoneHeader';
import { Box, Checkbox, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, IconButton, Tab, Tabs } from '@mui/material';
import { FitzoneApi } from '../../services/fitzoneApi';
import { IGetTrainerPermissionById } from '../../types/Types';
import { DataGrid, GridCloseIcon, GridColDef } from '@mui/x-data-grid';
import TextInput from '../../components/TextInput/TextInput';
import FButton from '../../components/Button/FButton';
import { TabPanel, a11yProps } from '../../utils/funcs/TabPanel';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Toast from '../../components/Toast/Toast';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BiCheckbox, BiCheckboxChecked } from 'react-icons/bi';
import { decodeJwt } from 'jose';

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

    const navigate = useNavigate();

    const [value, setValue] = useState(0);

    // Trainer Permissions State -- And With Filter
    const [filteredTrainerPermissions, setFilteredTrainerPermissions] = useState<IGetTrainerPermissionById[]>([]);
    const [trainerPermissionData, setTrainerPermissionData] = useState<IGetTrainerPermissionById[]>([]);
    const [filterText, setFilterText] = useState('');

    // Trainer Permission Form State -- And With Edit
    const [trainerPermissionForm, setTrainerPermissionForm] = useState<IGetTrainerPermissionById>(trainerPermissionParams);

    // Form Opener State
    const [isOpen, setIsOpen] = useState(false);

    // Form Type State -- Create | Edit
    const [formType, setFormType] = useState<'create' | 'edit'>('create');

    // Dialog Opener State
    const [dialogIsOpen, setDialogIsOpen] = useState(false);

    // Dialog Delete Permission State -- Permission Have Trainer List
    const [trainers, setTrainers] = useState<any[]>([]);

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

    const GetAllTrainerPermissions = async () => {
        FitzoneApi.GetAllTrainerPermission().then(res => {
            setFilteredTrainerPermissions(res.data);
            setTrainerPermissionData(res.data);
        }).catch(error => {
            console.log(error);
            if (error.response.status === 401) {
                RefreshToken();
            }
        });
    }


    useEffect(() => {
        RefreshToken();
        const role = decodeJwt(Cookies.get('token')!).typ;
        if (role !== 'admin') {
            clearToken();
        }
        GetAllTrainerPermissions();
    }, []);

    useEffect(() => {
        const filteredData = trainerPermissionData.filter((item) =>
            item.name.toLowerCase().includes(filterText.toLowerCase())
        );
        setFilteredTrainerPermissions(filteredData);
    }, [filterText]);

    const handleChangeTabs = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    // RESET TRAINER PERMISSION FORM
    const resetTrainerPermissionForm = () => {
        setTrainerPermissionForm(trainerPermissionParams);
        setIsOpen(false)
        setDialogIsOpen(false);
    };

    // CREATE TRAINER PERMISSION
    const handleCreateTrainerPermission = () => {
        setFormType('create');
        setTrainerPermissionForm(trainerPermissionParams);
        setIsOpen(true);
    }

    const createTrainerPermission = () => {
        Toast.fire({
            icon: 'info',
            title: 'Yetki ekleniyor...'
        });
        FitzoneApi.CreateTrainerPermission(trainerPermissionForm).then(res => {
            console.log(res);
            Toast.fire({
                icon: 'success',
                title: 'Yetki eklendi'
            });
            GetAllTrainerPermissions();
            resetTrainerPermissionForm();
        }).catch(err => {
            console.log(err);
            Toast.fire({
                icon: 'error',
                title: 'Yetki eklenemedi'
            });
        });
    }

    // EDIT TRAINER PERMISSION -- Update Trainer Permission Form
    const handleEditTrainerPermission = (item: IGetTrainerPermissionById) => {
        setFormType('edit');
        setIsOpen(true);
        setTrainerPermissionForm(item);
    }

    const handleTrainerPermissionForm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTrainerPermissionForm({
            ...trainerPermissionForm,
            [e.target.name]: e.target.checked
        });
    };

    const editTrainerPermission = () => {
        Toast.fire({
            icon: 'info',
            title: 'Yetki düzenleniyor...'
        });
        FitzoneApi.UpdateTrainerPermission(trainerPermissionForm).then(res => {
            console.log(res);
            Toast.fire({
                icon: 'success',
                title: 'Yetki düzenlendi'
            });
            GetAllTrainerPermissions();
            resetTrainerPermissionForm();
        }).catch(err => {
            console.log(err);
            Toast.fire({
                icon: 'error',
                title: 'Yetki düzenlenemedi'
            });
        });
    }

    // DELETE TRAINER PERMISSION
    const deleteTrainerPermissionDialog = (permission: IGetTrainerPermissionById) => {
        setDialogIsOpen(true);
        setTrainerPermissionForm(permission);
        FitzoneApi.GetTrainersByTrainerPermissionId(permission.id).then(res => {
            setTrainers(res.data);
        })
    }


    const deleteTrainerPermission = (id: string, length: number) => {
        if (length > 0) {
            resetTrainerPermissionForm();
            Toast.fire({
                icon: 'error',
                title: 'Yetkiyi kullanan antrenörler bulunuyor',
                text: 'Yetkiyi silmek için önce antrenör(ler)den yetkiyi kaldırın',
                timer: 4000
            });
            return;
        }
        Toast.fire({
            icon: 'info',
            title: 'Yetki siliniyor...'
        });
        resetTrainerPermissionForm();
        FitzoneApi.DeleteTrainerPermission(id).then(res => {
            console.log(res);
            Toast.fire({
                icon: 'success',
                title: 'Yetki silindi'
            });
            GetAllTrainerPermissions();
        }).catch(err => {
            console.log(err);
            Toast.fire({
                icon: 'error',
                title: 'Yetki silinemedi'
            });
        });
    }

    const saveTrainerPermission = (formType: string) => {
        if (formType === 'create') {
            createTrainerPermission();
        } else {
            editTrainerPermission();
        }
    };

    const columns: GridColDef[] = [
        {
            field: 'name',
            headerName: 'Yetki Adı',
            flex: 1,
            minWidth: 200,
        },
        {
            field: 'actions',
            headerName: 'İşlemler',
            minWidth: 200,
            renderCell: (params) => (
                <div className='flex justify-center gap-2'>
                    <FButton text='Düzenle' onClick={() => handleEditTrainerPermission(params.row)} />
                    <FButton text='Sil' onClick={() => deleteTrainerPermissionDialog(params.row)} theme='danger' />
                </div>
            )
        }
    ];

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
                        <Tab label="Salon Bilgileri" {...a11yProps(1)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        <div className='flex'>
                            <motion.div className={`${isOpen ? "w-[80%]" : "w-full"} h-[calc(100vh-112px)] overflow-y-auto flex flex-col gap-2 items-center`} layout>
                                <div className='w-full mt-5 flex'>
                                    <div className='w-[80%] px-1'>
                                        <TextInput placeholder='Yetki Arayın' value={filterText} onChange={(e) => setFilterText(e.target.value)} />
                                    </div>
                                    <div className='w-[20%] px-1'>
                                        <FButton text='Yetki Ekle' onClick={handleCreateTrainerPermission} />
                                    </div>
                                </div>
                                <div className='w-full h-full'>
                                    <DataGrid rows={filteredTrainerPermissions} columns={columns} pageSize={30} />
                                </div>
                            </motion.div>
                            <AnimatePresence>
                                {isOpen && (
                                    <motion.div
                                        initial={{ width: 0, opacity: 0, x: '100%' }}
                                        animate={{ width: '20%', opacity: 1, x: '0%' }}
                                        exit={{ width: 0, opacity: 0, x: '-100%' }}
                                        transition={{ duration: 0.3, origin: 1 }}
                                        className='w-[20%] pl-3 pt-5'
                                    >
                                        <div className='w-full h-full border border-gray-200 rounded-md flex flex-col px-3 py-2 gap-[3%]'>
                                            <div className='flex justify-between items-center'>
                                                <h1 className='text-center'>{formType === "create" ? "Yeni Yetki Ekleyin" : "Yetkiyi Düzenleyin"}</h1>
                                                <div className='p-1 hover:bg-gray-300 rounded-full cursor-pointer transition-all' onClick={resetTrainerPermissionForm}>
                                                    <AiOutlineCloseCircle size={25} className='text-gray-700' />
                                                </div>
                                            </div>
                                            <form action="" className='max-h-[calc(100vh-250px)] overflow-y-auto flex flex-col gap-2'>
                                                <div className='flex flex-col gap-2'>
                                                    <div className='px-2 py-1'>
                                                        <TextInput placeholder='Yetki Adı' value={trainerPermissionForm.name} onChange={(e) => setTrainerPermissionForm({ ...trainerPermissionForm, name: e.target.value })} />
                                                    </div>
                                                    {trainerPermissionParamCheckboxes.map((item, index) => (
                                                        <FormControlLabel
                                                            key={index}
                                                            control={<Checkbox checked={Boolean(trainerPermissionForm[item as keyof IGetTrainerPermissionById])} onChange={handleTrainerPermissionForm} name={item} />}
                                                            label={trainerPermissionParamLabels[index]}
                                                        />
                                                    ))}
                                                </div>
                                            </form>
                                            <FButton text='Kaydet' theme={formType === "create" ? 'primary' : "success"} onClick={() => saveTrainerPermission(formType)} />
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <div>
                                <Dialog
                                    onClose={setDialogIsOpen}
                                    open={dialogIsOpen}
                                >
                                    <DialogTitle sx={{ m: 0, p: 2 }}>
                                        Antrenör Yetkisini Sil
                                    </DialogTitle>
                                    <IconButton
                                        aria-label="close"
                                        sx={{
                                            position: 'absolute',
                                            right: 8,
                                            top: 8,
                                            color: (theme) => theme.palette.grey[500],
                                        }}
                                        onClick={() => setDialogIsOpen(false)}
                                    >
                                        <GridCloseIcon />
                                    </IconButton>
                                    <DialogContent dividers>
                                        <div className='flex flex-col gap-5'>
                                            <div className='flex gap-2'>
                                                <div>
                                                    <span className='font-semibold'>Yetki Adı:</span>
                                                </div>
                                                <div>
                                                    <span>{trainerPermissionForm.name}</span>
                                                </div>
                                            </div>
                                            <div className='flex gap-2'>
                                                <div>
                                                    <span className='font-semibold'>Yetkiyi Kullanan Antrenör Sayısı:</span>
                                                </div>
                                                <div>
                                                    <span>{trainers.length}</span>
                                                </div>
                                            </div>
                                            <div>
                                                <span className='font-semibold'>Yetkiyi Kullanan Antrenörler:</span>
                                                <div>
                                                    {trainers.length > 0 ? trainers.map((item, index) => (
                                                        <div key={index}>
                                                            <span>{item.name}</span>
                                                        </div>
                                                    ))
                                                        :
                                                        <span>Yetkiyi kullanan antrenör bulunamadı</span>
                                                    }
                                                </div>
                                            </div>
                                            <div>
                                                <span className='font-semibold'>Yetkiler:</span>
                                                <div>
                                                    {trainerPermissionParamCheckboxes.map((item, index) => (
                                                        <div key={index} className={`flex items-center gap-2 ${index == 0 ? "" : "border-t"} py-1`}>
                                                            <span>{trainerPermissionParamLabels[index]}</span>
                                                            <span>{Boolean(trainerPermissionForm[item as keyof IGetTrainerPermissionById]) ? <BiCheckboxChecked size={20} color='green' /> : <BiCheckbox size={20} color='red' />}</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    </DialogContent>
                                    <DialogActions>
                                        <Button variant='contained' color='error' onClick={() => deleteTrainerPermission(trainerPermissionForm.id, trainers.length)}>
                                            Yetkiyi Sil
                                        </Button>
                                    </DialogActions>
                                </Dialog>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1} />
                </Box>
            </div>
        </div>
    );
};

export default AdminPanel;