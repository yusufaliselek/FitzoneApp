import React, { useEffect, useState } from 'react';
import { RiAccountCircleLine, RiEdit2Fill } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { decodeJwt } from 'jose';
import FitzoneHeader from '../../components/Header/FitzoneHeader';
import Nav from '../../components/Nav/Nav';
import { FitzoneApi } from '../../services/fitzoneApi';
import Cookies from 'js-cookie';
import { DataGrid, GridColDef, trTR } from '@mui/x-data-grid';




const Trainers = () => {

  const navigate = useNavigate()

  const [trainerData, setTrainerData] = useState<any[]>([]);

  const [permission, setPermission] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: 'userName',
      headerName: 'Kullanıcı Adı',
      width: 200,
    },
    {
      field: 'firstName',
      headerName: 'Ad',
      width: 200,
    },
    {
      field: 'lastName',
      headerName: 'Soyad',
      width: 200,
    },
    {
      field: 'email',
      headerName: 'Email',
      width: 300,
    },
    {
      field: 'phoneNumber',
      headerName: 'Telefon',
      width: 200,
    },
    {
      field: 'id',
      headerName: 'İşlemler',
      flex: 1,
      minWidth: 200,
      align: 'right',
      renderCell: (params) => (
        <div className='flex gap-3 pr-2'>
          <button onClick={() => navigate(`/trainers/${params.value}`)} className='flex items-center justify-center w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all'>
            <RiEdit2Fill className='w-5 h-5' />
          </button>
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
    FitzoneApi.GetAllTrainers().then((res) => {
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

  return (
    <div className='flex w-screen h-screen'>
      {/* Navbar */}
      <Nav pageName='Antrenörler' />
      <div className='flex flex-col w-full h-screen'>
        {/* Header */}
        <FitzoneHeader pageName='Antrenörler' {...(permission && { addContent: 'Antrenör Ekle', addContentIcon: <RiAccountCircleLine className='h-7 w-7' />, addContentAction: navigateAddTrainer })} />
        <div className='w-full h-[calc(100vh-65px)] p-5'>
          <DataGrid rows={trainerData} columns={columns} pageSize={20} localeText={trTR.components.MuiDataGrid.defaultProps.localeText} />

          <div>
            {
              /* 
              <div className='w-full px-5'>
                <TextInput placeholder='Antrenör Arayın' value={filterText} onChange={(e) => setFilterText(e.target.value)} />
              </div>
              <div className='flex flex-col gap-3 p-5 overflow-y-scroll overflow-x-hidden flex-wrap items-start'>
                {filteredTrainerData.map((trainer, i) => {
                  let trainerName: string;
                  if (trainer.firstName && trainer.lastName) {
                    trainerName = trainer.firstName + ' ' + trainer.lastName;
                  } else {
                    trainerName = trainer.userName;
                  }
    
                  return (
                    <motion.div
                      key={trainer.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.95 }}
                      className='flex justify-center w-full'
                    >
                      <div key={i} className='w-full flex flex-col shadow-lg p-5 bg-white bg-opacity-80 rounded-md'>
                        <div className='flex justify-between'>
                          <div className='flex items-center gap-2'>
                            <div className='w-10 h-10 rounded-full bg-gray-300'>
                              {
                                trainer.personalPhoto ?
                                  <img src={trainer.personalPhoto} alt='trainer' className='w-full h-full rounded-full' />
                                  :
                                  <div className='flex justify-center items-center w-full h-full text-2xl text-gray-400'>
                                    {trainerName[0].toUpperCase()}
                                  </div>
                              }
                            </div>
                            <div className='flex flex-col'>
                              <div className='text-sm font-medium text-gray-700'>{trainerName}</div>
                              <div className='text-xs font-normal text-gray-400'>{trainer.email}</div>
                            </div>
                          </div>
                          <div className='flex gap-3'>
                            <FButton text='Detay' onClick={() => navigate(`/trainers/${trainer.id}`)} />
                            <FButton text='Düzenle' onClick={() => navigate(`/trainers/edit/${trainer.id}`)} />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )
                })}
              </div> 
              */
            } </div>

        </div>
      </div>
    </div>
  )
}

export default Trainers