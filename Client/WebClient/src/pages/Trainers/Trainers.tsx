import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from 'jose';
import FitzoneHeader from '../../components/Header/FitzoneHeader';
import Nav from '../../components/Nav/Nav';
import { FitzoneApi } from '../../services/fitzoneApi';
import Cookies from 'js-cookie';
import { DataGrid, GridColDef, trTR } from '@mui/x-data-grid';
import { BiShow } from 'react-icons/bi';
import { FaUserSlash } from 'react-icons/fa';
import { RiAccountCircleLine } from 'react-icons/ri';
import { Tooltip } from '@mui/material';
import Toast from '../../components/Toast/Toast';
import Swal from 'sweetalert2';

const Trainers = () => {

  const navigate = useNavigate()

  const [trainerData, setTrainerData] = useState<any[]>([]);

  const [permission, setPermission] = useState<boolean>(false);

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
          <Tooltip title="Antrenör Detayı">
            <button onClick={() => navigate(`/trainers/${params.value}`)} className='flex items-center justify-center p-2 rounded-full text-blue-400 hover:bg-gray-300 hover:text-blue-500 transition-all'>
              <BiShow className='w-5 h-5' />
            </button>
          </Tooltip>
          {
            permission &&
            <Tooltip title="Antrenörü Dondur">
              <button onClick={() => freezeTrainer(params.value)} className='flex items-center justify-center p-2 rounded-full text-red-400 hover:bg-gray-300 hover:text-red-500 transition-all'>
                <FaUserSlash className='w-5 h-5' />
              </button>
            </Tooltip>
          }
        </div>
      )
    }
  ]

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
    FitzoneApi.GetAllActiveTrainers().then((res) => {
      setTrainerData(res.data);
    })
    const role = decodeJwt(Cookies.get('token')!).typ;
    if (role === 'admin') {
      setPermission(true);
    }
  }, [])


  const navigateAddTrainer = () => {
    navigate("/trainers/add");
  }

  const freezeTrainer = (id: string) => {
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
        FitzoneApi.FreezeTrainer(id).then((res) => {
          Toast.fire({
            icon: 'success',
            title: 'Antrenör donduruldu'
          })
          FitzoneApi.GetAllActiveTrainers().then((res) => {
            setTrainerData(res.data);
          })
        }).catch((error) => {
          Toast.fire({
            icon: 'error',
            title: 'Antrenör dondurulamadı'
          })
        })
      }
    })
  }

  return (
    <div className='flex w-screen h-screen'>
      {/* Navbar */}
      <Nav pageName='Antrenörler' />
      <div className='flex flex-col w-full h-screen'>
        {/* Header */}
        <FitzoneHeader pageName='Antrenörler' {...(permission && { addContent: 'Antrenör Ekle', addContentIcon: <RiAccountCircleLine className='h-7 w-7' />, addContentAction: navigateAddTrainer })} />
        <div className='w-full h-[calc(100vh-65px)] p-5'>
          <DataGrid rows={trainerData} columns={columns} localeText={trTR.components.MuiDataGrid.defaultProps.localeText} />
        </div>
      </div>
    </div>
  )
}

export default Trainers