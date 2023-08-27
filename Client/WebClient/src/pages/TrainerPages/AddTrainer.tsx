import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav/Nav';
import FButton from '../../components/Button/FButton';
import { useNavigate } from 'react-router-dom';
import FitzoneHeader from '../../components/Header/FitzoneHeader';
import { BsPersonBadgeFill } from 'react-icons/bs';
import TextInput from '../../components/TextInput/TextInput';
import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';
import { FitzoneApi } from '../../services/fitzoneApi';

const addTrainerProps = {
  userName: '',
  email: '',
  password: '',
  passwordConfirm: '',
  role: 'trainer',
}

const TrainerDetail = () => {

  const navigate = useNavigate()

  const [trainer, setTrainer] = useState(addTrainerProps);

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTrainer({
      ...trainer,
      [e.target.id]: e.target.value
    })
  }

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
    RefreshToken();
    const role = decodeJwt(Cookies.get('token')!).typ;
    if (role !== 'admin') {
      clearToken();
    }
  }, [])



  return (
    <div className='flex w-screen h-screen'>
      <Nav pageName='Antrenörler' />
      <div className='flex flex-col w-full h-screen'>
        {/* Header */}
        <FitzoneHeader pageName='Antrenör Kayıt' />
        <div className='flex justify-center w-full h-full'>
          <form action="" className='flex flex-col w-2/5 gap-4 mt-[3%] p-5'>
            <div className='mt-3 flex items-center justify-center'>
              <BsPersonBadgeFill size={40} color='lightgray' />
            </div>
            <div className='flex gap-3'>
              <TextInput id='email' label='E-posta' value={trainer.email} onChange={handleChangeForm} type='email' />
              <TextInput id='userName' label='Kullanıcı Adı' value={trainer.userName} onChange={handleChangeForm} />
            </div>
            <div className='flex gap-3'>
              <TextInput id='password' label='Şifre' value={trainer.password} onChange={handleChangeForm} type='password' />
              <TextInput id='passwordConfirm' label='Şifreyi Tekrar Giriniz' value={trainer.passwordConfirm} onChange={handleChangeForm} type='password' />
            </div>
            <div className='flex mt-3 flex-col gap-3'>
              <FButton text='Kaydet' onClick={() => { }} />
              <FButton text='Geri' onClick={() => navigate("/trainers")} theme='secondary' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default TrainerDetail