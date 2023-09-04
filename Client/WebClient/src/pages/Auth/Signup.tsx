import React, { useState } from 'react';
import cardio from '../../assets/cardio.jpg'
import Toast from '../../components/Toast/Toast';
import { FitzoneApi } from '../../services/fitzoneApi';
import { useNavigate } from 'react-router-dom';

const Signup = () => {

    const navigate = useNavigate()

    const [signupData, setSignupData] = useState({
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
    })

    const ToastError = (text: string) => {
        return Toast.fire({
            icon: 'error',
            title: text
        })
    }

    const clearPassword = () => {
        setSignupData({
            ...signupData,
            password: '',
            confirmPassword: ''
        })
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSignupData({
            ...signupData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        e.preventDefault()

        if (signupData.password !== signupData.confirmPassword) {
            ToastError('Şifreler eşleşmiyor!')
            clearPassword()
            return;
        }

        if (signupData.password.length < 6) {
            ToastError('Şifre en az 6 karakter olmalıdır!')
            clearPassword()
            return;
        }

        if (!/[a-z]/.test(signupData.password) || !/[A-Z]/.test(signupData.password)) {
            Toast.fire({
                icon: 'error',
                title: 'Şifre en az bir büyük ve bir küçük harf içermeli!'
            })
            return;
        }

        FitzoneApi.RegisterUser(signupData).then(res => {
            Toast.fire({
                icon: 'success',
                title: 'Kayıt başarılı!',
                text: 'Yönetici onayından sonra giriş yapabilirsiniz.'
            })
            navigate('/')
        }).catch(err => {
            ToastError(err.errors[0])
            clearPassword()
        })
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <img src={cardio} alt="description of" className={`object-cover w-full h-full absolute`} />
            <div className="w-full p-6 m-auto bg-black/[0.6] rounded-md shadow-md lg:max-w-xl relative">
                <h1 className="text-3xl font-semibold text-center text-white tracking-widest">
                    FIT<span className='text-orange-500'>Z</span>ONE
                </h1>
                <form className="mt-6" onSubmit={handleSubmit}>
                    <div className="mb-2">
                        <label
                            form="email"
                            className="block text-sm font-semibold text-gray-300"
                        >
                            E-posta
                        </label>
                        <input
                            required
                            value={signupData.email}
                            name="email"
                            onChange={handleChange}
                            type="email"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            form="username"
                            className="block text-sm font-semibold text-gray-300"
                        >
                            Kullanıcı Adı
                        </label>
                        <input
                            required
                            value={signupData.username}
                            name="username"
                            onChange={handleChange}
                            type="text"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            form="password"
                            className="block text-sm font-semibold text-gray-300"
                        >
                            Şifre
                        </label>
                        <input
                            required
                            value={signupData.password}
                            name="password"
                            onChange={handleChange}
                            type="password"
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mb-2">
                        <label
                            form="password"
                            className="block text-sm font-semibold text-gray-300"
                        >
                            Şifreyi Onaylayın
                        </label>
                        <input
                            type="password"
                            value={signupData.confirmPassword}
                            name="confirmPassword"
                            onChange={handleChange}
                            required
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                        />
                    </div>
                    <div className="mt-6">
                        <button type='submit' className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                            Kayıt Ol
                        </button>
                    </div>
                </form>

                <p className="mt-8 text-xs font-light text-center text-gray-300">
                    {" "}
                    Hesabınız var mı?{" "}
                    <a
                        href="/"
                        className="font-medium text-blue-600 hover:underline"
                    >
                        Giriş Yap
                    </a>
                </p>
            </div>
        </div>
    )
}

export default Signup