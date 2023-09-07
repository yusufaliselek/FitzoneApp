import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Tooltip, DialogContentText, TextField, Select, FormControl, InputLabel, MenuItem } from '@mui/material';
import { FitzoneApi } from '../../services/fitzoneApi';
import { DataGrid, GridColDef, trTR } from '@mui/x-data-grid';
import Toast from '../../components/Toast/Toast';
import { AiFillDelete } from 'react-icons/ai';
import { BiUserCheck } from 'react-icons/bi';
import Swal from 'sweetalert2';

const RegisterUsers = () => {
    // Register Users State
    const [registerUsers, setRegisterUsers] = useState<any[]>([]);

    ////////////////////////////////
    /// Register Users Functions ///
    ////////////////////////////////

    const [open, setOpen] = React.useState(false);

    const [registerUser, setRegisterUser] = useState<any>({
        id: '',
        userName: '',
        email: '',
        role: '',
    });

    useEffect(() => {
        getRegisterUsers();
    }, []);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setRegisterUser({
            id: '',
            userName: '',
            email: '',
            role: '',
        });
    };

    const getRegisterUsers = () => {
        FitzoneApi.GetRegisterUsers().then(res => {
            setRegisterUsers(res.data);
        })
    }

    const checkRegisterUser = (user: any) => {
        setRegisterUser(user);
        handleClickOpen();
        console.log(registerUser)
    }

    const handleDeleteRegisterUser = (id: string) => {
        Swal.fire({
            title: 'Üyeyi silmek istediğinizden emin misiniz?',
            text: registerUsers.filter(item => item.id === id)[0].email + " - " + registerUsers.filter(item => item.id === id)[0].userName,
            showDenyButton: true,
            confirmButtonText: `Sil`,
            denyButtonText: `Vazgeç`,
            confirmButtonColor: '#dc3545',
            denyButtonColor: '#6c757d',
        }).then((result) => {
            if (result.isConfirmed) {
                FitzoneApi.DeleteUser(id).then(res => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Üye silindi'
                    });
                    getRegisterUsers();
                }).catch(err => {
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

    const handleVerifyRegisterUser = () => {
        if (registerUser.role === '') {
            Toast.fire({
                icon: 'error',
                title: 'Lütfen rol seçiniz'
            });
            handleClose();
            return;
        }
        handleClose();
        Toast.fire({
            icon: 'info',
            title: 'Üye onaylanıyor...'
        });
        FitzoneApi.UpdateUserRole(registerUser.id, registerUser.role).then(res => {
            setRegisterUser({
                id: '',
                userName: '',
                email: '',
                role: '',
            });
            Toast.fire({
                icon: 'success',
                title: 'Üye onaylandı'
            });
            getRegisterUsers();
        }).catch(err => {
            Toast.fire({
                icon: 'error',
                title: 'Üye onaylanamadı'
            });
        })
    }

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
                        <button onClick={() => checkRegisterUser(params.row)} className='flex items-center justify-center p-2 rounded-full text-green-600 hover:bg-gray-300 hover:text-green-700 transition-all'>
                            <BiUserCheck className='w-5 h-5' />
                        </button>
                    </Tooltip>
                    <Tooltip title="Üyeyi Sil">
                        <button onClick={() => handleDeleteRegisterUser(params.value)} className='flex items-center justify-center p-2 rounded-full text-red-400 hover:bg-gray-300 hover:text-red-500 transition-all'>
                            <AiFillDelete className='w-5 h-5' />
                        </button>
                    </Tooltip>
                </div>
            )
        }
    ]


    return (
        <div className='flex justify-center items-center w-full h-[calc(100vh-120px)] mt-1'>
            <DataGrid rows={registerUsers} columns={columnsRegisterUsers} localeText={trTR.components.MuiDataGrid.defaultProps.localeText} />
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Kullanıcı Onayı</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Kullanıcıyı onaylamak istediğinizden emin misiniz?
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="normal"
                            id="name"
                            label="Kullanıcı Adı"
                            type="text"
                            fullWidth
                            value={registerUser.userName}
                            disabled
                            size='small'
                        />
                        <TextField
                            autoFocus
                            margin="normal"
                            id="name"
                            label="E-posta"
                            type="email"
                            fullWidth
                            value={registerUser.email}
                            disabled
                            size='small'
                        />
                        <FormControl fullWidth size='small' margin='normal'>
                            <InputLabel>Kullanıcı Rolü</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={registerUser.role}
                                label="Kullanıcı Rolü"
                                onChange={(e) => setRegisterUser({ ...registerUser, role: e.target.value })}
                            >
                                <MenuItem value="trainer">Antrenör</MenuItem>
                                <MenuItem value="member">Üye</MenuItem>
                            </Select>
                        </FormControl>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} variant='contained' color='warning'>İptal</Button>
                        <Button onClick={handleVerifyRegisterUser} variant='contained' color='success'>Onayla</Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    )
}

export default RegisterUsers