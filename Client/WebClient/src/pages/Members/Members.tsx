import { DataGrid, GridColDef, trTR } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { RiAccountCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import AddContentHeader from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import { Tooltip } from '@mui/material';
import { BiShow } from 'react-icons/bi';
import { FaUserSlash } from 'react-icons/fa';
import { FitzoneApi } from '../../services/fitzoneApi';
import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';
import Toast from '../../components/Toast/Toast';
import Swal from 'sweetalert2';

const Members = () => {
    const navigate = useNavigate()

    const [permission, setPermission] = useState(true);

    const [rows, setRows] = useState([]);

    const goLogin = () => navigate('/login')

    const clearToken = () => {
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        goLogin();
    }

    const RefreshToken = () => {
        if (!Cookies.get('token')) {
            return FitzoneApi.ResfreshAccessTokenByRefreshToken().then((response) => {
                Cookies.set('token', response.data.accessToken, { expires: new Date(response.data.accessTokenExpiration) });
                Cookies.set('refreshToken', response.data.refreshToken, { expires: new Date(response.data.refreshTokenExpiration) });
                console.log("Token yenilendi");
            }).catch((error) => {
                console.log(error)
                clearToken()
            });
        }
    }

    useEffect(() => {
        RefreshToken()
        FitzoneApi.GetAllActiveMembers().then((res) => {
            setRows(res.data);
        })
        const role = decodeJwt(Cookies.get('token')!).typ;
        if (role === 'admin') {
            setPermission(true);
        }
    }, [])

    
    const columns: GridColDef[] = [
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
                    {
                        permission &&
                        <Tooltip title="Üyeyi Dondur">
                            <button onClick={() => freezeMember(params.value)} className='flex items-center justify-center p-2 rounded-full text-red-400 hover:bg-gray-300 hover:text-red-500 transition-all'>
                                <FaUserSlash className='w-5 h-5' />
                            </button>
                        </Tooltip>
                    }
                </div>
            )
        }
    ];

    function addMember() {
        navigate("/members/add");
    }

    const freezeMember = (id: string) => {
        Swal.fire({
            title: 'Dondurmak istediğinizden emin misiniz?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Evet, dondur!',
            cancelButtonText: 'Hayır'
          }).then((result) => {
            if (result.isConfirmed) {
                FitzoneApi.FreezeMember(id).then((res) => {
                    Toast.fire({
                        icon: 'success',
                        title: 'Üye donduruldu'
                    })
                    RefreshToken()
                    FitzoneApi.GetAllActiveMembers().then((res) => {
                        setRows(res.data);
                    })
                }).catch((error) => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Üye dondurulamadı'
                    })
                })
            }
          })
    }


    return (
        <div className='flex w-screen h-screen'>
            {/* Navbar */}
            <Nav pageName='Üyeler' />
            <div className='flex flex-col w-full h-screen'>
                {/* Header */}
                <AddContentHeader pageName='Üyeler' addContent='Üye ekle' addContentIcon={<RiAccountCircleLine className='h-7 w-7' />} addContentAction={addMember} />
                {/* Content */}
                <div className='flex items-center p-5 grow'>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                    />
                </div>
            </div>
        </div>
    )
}

export default Members