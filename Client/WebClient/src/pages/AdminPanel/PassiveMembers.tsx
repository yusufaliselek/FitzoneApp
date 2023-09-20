import React, { useState, useEffect } from 'react';
import { Tooltip } from '@mui/material';
import { FitzoneApi } from '../../services/fitzoneApi';
import { GridColDef, trTR } from '@mui/x-data-grid';
import { useNavigate } from 'react-router-dom';
import Toast from '../../components/Toast/Toast';
import { AiFillDelete } from 'react-icons/ai';
import { BiShow, BiUserCheck } from 'react-icons/bi';
import Swal from 'sweetalert2';
import StyledDataGrid from '../../components/StyledDataGrid/StyledDataGrid';
import TextInput from '../../components/TextInput/TextInput';

const PassiveMembers = () => {

    const navigate = useNavigate();

    // Freeze Member States
    const [passiveMembers, setPassiveMembers] = useState<any[]>([]);

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

    useEffect(() => {
        getAllPassiveMembers();
    }, []);

    return (
        <div className='h-[calc(100vh-112px)] overflow-y-auto flex flex-col gap-2 items-center'>
            <div className='w-full px-1 mt-5'>
                <TextInput placeholder='Hızlı Ara..' value={""} onChange={(e) => { }} />
            </div>
            <div className='w-full h-full'>
                <StyledDataGrid rows={passiveMembers} columns={freezeMemberColumns} localeText={trTR.components.MuiDataGrid.defaultProps.localeText} />
            </div>
        </div>
    )
}

export default PassiveMembers