import React, { useEffect, useState } from 'react';
import { RiAccountCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { decodeJwt } from 'jose';
import FitzoneHeader from '../../components/Header/FitzoneHeader';
import Nav from '../../components/Nav/Nav';
import { FitzoneApi } from '../../services/fitzoneApi';
import Cookies from 'js-cookie';



const Trainers = () => {

  const navigate = useNavigate()

  const [coachData, setCoachData] = useState<any[]>([]);

  const [permission, setPermission] = useState<boolean>(false);

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
      setCoachData(res.data);
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
        <div className='w-full h-[calc(100vh-65px)] overflow-y-auto flex flex-col gap-2'>
          a
        </div>
      </div>
    </div>
  )
}

export default Trainers