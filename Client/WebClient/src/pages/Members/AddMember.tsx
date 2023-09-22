import React, { useEffect, useState } from 'react';
import Nav from '../../components/Nav/Nav';
import FButton from '../../components/Button/FButton';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import TextInput from '../../components/TextInput/TextInput';
import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';
import { FitzoneApi } from '../../services/fitzoneApi';
import Toast from '../../components/Toast/Toast';
import { RiAccountCircleLine } from 'react-icons/ri';

const addMemberProps = {
  userName: '',
  email: '',
  newPassword: '',
  newPasswordAgain: '',
}

const AddMember = () => {

  const navigate = useNavigate()

  const [member, setMember] = useState(addMemberProps);

  useEffect(() => {
    RefreshToken();
    const role = decodeJwt(Cookies.get('token')!).typ;
    if (role !== 'admin') { // TODO: Trainer için değiştirilecek -> Yetki kontrolü
      clearToken();
    }
  }, [])

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMember({
      ...member,
      [e.target.id]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => { // Burası değişecek -- TODO
    e.preventDefault();
    if (member.newPassword != member.newPasswordAgain) {
      Toast.fire({
        icon: 'error',
        title: 'Şifreler uyuşmuyor!'
      })
      console.log(member);
      return;
    }
    if (member.newPassword.length < 6) {
      Toast.fire({
        icon: 'error',
        title: 'Şifre en az 6 karakterden oluşmalı!'
      })
      return;
    }
    if (member.userName.length < 5) {
      Toast.fire({
        icon: 'error',
        title: 'Kullanıcı adı en az 5 karakterden oluşmalı!'
      })
      return;
    }
    // Büyük küçük harf kontrolü
    if (!/[a-z]/.test(member.newPassword) || !/[A-Z]/.test(member.newPassword)) {
      Toast.fire({
        icon: 'error',
        title: 'Şifre en az bir büyük ve bir küçük harf içermeli!'
      })
      return;
    }
    Toast.fire({
      icon: 'info',
      title: 'Üye oluşturuluyor...'
    })
    const memberCreate = {
      userName: member.userName,
      email: member.email,
      password: member.newPassword,
      role: 'member'
    }
    FitzoneApi.CreateUser(memberCreate).then((response) => {
      Toast.fire({
        icon: 'success',
        title: 'Üye oluşturuldu!'
      })
      navigate('/members')
    }).catch((error) => {
      console.log(error);
      Toast.fire({
        icon: 'error',
        title: 'Üye oluşturulamadı!',
        text: error.errors[0]
      })
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





  return (
    <div className='flex w-screen h-screen'>
      <Nav pageName='Üyeler' />
      <div className='flex flex-col w-full h-screen'>
        {/* Header */}
        <Header pageName='Üye Kayıt' />
        <div className='flex justify-center w-full h-full'>
          <form onSubmit={handleSubmit} className='flex flex-col w-2/5 gap-4 mt-[3%] p-5'>
            <div className='mt-3 flex items-center justify-center'>
              <RiAccountCircleLine size={40} color='lightgray' />
            </div>
            <div className='flex gap-3'>
              <TextInput id='email' label='E-posta' value={member.email} onChange={handleChangeForm} type='email' required />
              <TextInput id='userName' label='Kullanıcı Adı' value={member.userName} onChange={handleChangeForm} required />
            </div>
            <div className='flex gap-3'>
              <TextInput id='newPassword' label='Şifre' value={member.newPassword} onChange={handleChangeForm} type='password' required />
              <TextInput id='newPasswordAgain' label='Şifreyi Tekrar Giriniz' value={member.newPasswordAgain} onChange={handleChangeForm} type='password' required />
            </div>
            <div className='flex mt-3 flex-col gap-3'>
              <FButton text='Kaydet' type='submit' />
              <FButton text='Geri' onClick={() => navigate("/members")} theme='secondary' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}


export default AddMember