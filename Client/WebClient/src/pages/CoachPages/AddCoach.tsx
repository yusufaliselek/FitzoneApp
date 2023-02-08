import React, { useState } from 'react';
import Nav from '../../components/Nav/Nav';

const AddCoach = () => {

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userId, setUserId] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [userName, setUserName] = useState('')
  const [password, setPassword] = useState('')
  const [passwordConfirmation, setPasswordConfirmation] = useState('')
  const [authorizationType, setAuthorizationType] = useState('')

  return (
    <div className='flex w-screen h-screen'>
      <Nav pageName='Üyeler' />
      <div className='flex w-full h-screen items-center justify-center'>
        <div className='flex flex-col border-2 w-5/6 h-fit p-8 gap-y-8 rounded-2xl items-center'>
          <p className='text-2xl w-full text-center text-gray-600'>Antrenör Kayıt</p>
          <form action="" className='flex w-full justify-center'>
            <div className='flex flex-col w-1/2 gap-y-3 px-5'>
              <p className='text-sm text-gray-600 pb-1 border-b'>Kişisel Bilgiler</p>
              <div className="mb-2">
                <label
                  form="firstName"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Adı
                </label>
                <input
                  type="text"
                  value={firstName} onChange={e => setFirstName(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  form="lastName"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Soyadı
                </label>
                <input
                  type="text"
                  value={lastName} onChange={e => setLastName(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  form="userId"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Kimlik Numarası
                </label>
                <input
                  type="number"
                  value={userId} onChange={e => setUserId(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  form="phoneNumber"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Telefon Numarası
                </label>
                <input
                  name="telphone" placeholder="888 888 8888" pattern="[0-9]{3} [0-9]{3} [0-9]{4}" title="Ten digits code" required
                  value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
            </div>
            <div className='flex flex-col w-1/2 gap-y-3 px-5'>
              <p className='text-sm text-gray-600 pb-1 border-b'>Hesap Bilgileri</p>
              <div className="mb-2">
                <label
                  form="username"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Kullanıcı Adı
                </label>
                <input
                  type="text"
                  value={userName} onChange={e => setUserName(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  form="password"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Şifre
                </label>
                <input
                  type="password"
                  value={password} onChange={e => setPassword(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  form="passwordConfirmation"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Şifreyi Onaylayın
                </label>
                <input
                  type="password"
                  value={passwordConfirmation} onChange={e => setPasswordConfirmation(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>
              <div className="mb-2">
                <label
                  form="authorizationType"
                  className="block text-sm font-semibold text-gray-600"
                >
                  Yetki Tipi
                </label>
                <select
                  value={authorizationType} onChange={e => setAuthorizationType(e.target.value)}
                  className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40">
                  <option value="mapFunc">mapFunc</option>
                  <option value="saab">Saab</option>
                  <option value="opel">Opel</option>
                  <option value="audi">Audi</option>
                </select>
              </div>
            </div>
          </form>
          <div className='flex w-full gap-x-4 justify-end pr-5'>
            <button type="submit" className='py-2 px-4 bg-red-600 hover:bg-red-400 text-white rounded-md'>İptal</button>
            <button type="submit" className='py-2 px-4 bg-gray-800 text-white rounded-md'>Kayıt Oluştur</button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default AddCoach