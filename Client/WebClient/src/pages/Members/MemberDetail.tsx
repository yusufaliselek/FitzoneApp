import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FitzoneApi } from '../../services/fitzoneApi'
import Toast from '../../components/Toast/Toast'
import Nav from '../../components/Nav/Nav'
import Header from '../../components/Header/Header'
import TextInput from '../../components/TextInput/TextInput'
import { RiAccountCircleLine } from 'react-icons/ri'
import FButton from '../../components/Button/FButton'
import genders from '../../assets/Genders'
import SelectInput from '../../components/SelectInput/SelectInput'
import Cookies from 'js-cookie'
import { decodeJwt } from 'jose'
import RefreshToken from '../../utils/funcs/RefreshToken'

const memberParams = {
  birthdayDate: "",
  createdAt: "",
  email: "",
  firstName: "",
  gender: "",
  id: "",
  lastName: "",
  personalPhoto: "",
  phoneNumber: "",
  role: "",
  tckno: "",
  userName: "",
}

const MemberDetail = () => {
  const params = useParams()
  const navigate = useNavigate()

  const [member, setMember] = useState<any>(memberParams)

  const [isAdmin, setIsAdmin] = useState<boolean>(false)


  useEffect(() => {
    RefreshToken()
    FitzoneApi.GetUserById(String(params.id)).then((res) => {
      setMember(res.data)
    }).catch((err) => {
      console.log(err)
      Toast.fire({
        icon: 'error',
        title: 'Bir hata oluştu. Lütfen tekrar deneyiniz.'
      })
    })
    setIsAdmin(decodeJwt(String(Cookies.get('token')))?.typ === 'admin');
  }, [])

  const updateUser = (e: any) => {
    Toast.fire({
      icon: 'info',
      title: 'Güncelleniyor...'
    })
    FitzoneApi.UpdateUser(member).then((res) => {
      Toast.fire({
        icon: 'success',
        title: 'Kullanıcı bilgileri güncellendi.'
      })
      navigate('/members/')
    })
  }

  const handleChangeForm = (e: any) => {
    setMember({ ...member, [e.target.id]: e.target.value })
  }

  return (
    <div className='flex w-screen h-screen'>
      <Nav pageName='Üyeler' />
      <div className='flex flex-col w-full h-screen'>
        {/* Header */}
        <Header pageName='Üye Bilgisi' />
        <div className='flex justify-center w-full h-full'>
          <div className='flex flex-col w-2/5 gap-4 mt-[3%] p-5'>
            <div className='mt-3 flex items-center justify-center'>
              <RiAccountCircleLine size={40} color='lightgray' />
            </div>
            <div className='flex gap-3'>
              <TextInput id='firstName' label='Ad' value={member.firstName} onChange={handleChangeForm} disabled={!isAdmin} />
              <TextInput id='lastName' label='Soyad' value={member.lastName} onChange={handleChangeForm} disabled={!isAdmin} />
            </div>
            <div className='flex gap-3'>
              <TextInput id='email' label='E-Posta' value={member.email} onChange={handleChangeForm} disabled />
              <TextInput id='userName' label='Kullanıcı Adı' value={member.userName} onChange={handleChangeForm} disabled />
            </div>
            <div className='flex gap-3'>
              <TextInput id='phoneNumber' label='Telefon Numarası' value={member.phoneNumber} onChange={handleChangeForm} disabled={!isAdmin} />
              <TextInput id='tckno' label='TCKNO' value={member.tckno} onChange={handleChangeForm} disabled={!isAdmin} />
            </div>
            <div className='flex gap-3'>
              <SelectInput id='gender' label='Cinsiyet' value={member.gender} onChange={(e: any) => handleChangeForm(e)} options={genders} disabled={!isAdmin} />
              <TextInput id='birthdayDate' label='Doğum Tarihi' value={member.birthdayDate} onChange={handleChangeForm} type='date' disabled={!isAdmin} />
            </div>
            <div className='flex mt-3 flex-col gap-3'>
              <FButton text='Kaydet' onClick={updateUser} />
              <FButton text='Geri' onClick={() => navigate("/members")} theme='secondary' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MemberDetail