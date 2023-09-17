import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import bg from '../../assets/bg-main.jpg';
import Spinner from '../../components/Spinner/Spinner';
import { FitzoneApi } from '../../services/fitzoneApi';
import Toast from '../../components/Toast/Toast';


const Login = () => {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Eğer token varsa dashboard'a yönlendiriyoruz.
        if (Cookies.get("token") && Cookies.get("refreshToken") && Cookies.get("token") !== "undefined" && Cookies.get("refreshToken") !== "undefined") {
            navigate("/dashboard");
        }
    }, []);

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        setLoading(true);
        FitzoneApi.Login(email, password).then((response) => {
            if (!response.data.accessToken) {
                setLoading(false);
                setEmail('');
                setPassword('');
                Toast.fire({
                    icon: "error",
                    title: "Hata oluştu.",
                });
                return;
            }

            // if role is member, can't login
            if (decodeJwt(response.data.accessToken!).typ === "member") {
                setLoading(false);
                setEmail('');
                setPassword('');
                Toast.fire({
                    icon: "error",
                    title: "Bu kullanıcı giriş yapamaz.",
                });
                return;
            }

            // Token bilgilerini cookie'ye yazdırıyoruz.
            Cookies.set("token", response.data.accessToken, { expires: new Date(response.data.accessTokenExpiration), secure: true });
            Cookies.set("refreshToken", response.data.refreshToken, { expires: new Date(response.data.refreshTokenExpiration), secure: true });



            // Token bilgilerini aldıktan sonra loading'i false yapıyoruz && dashboard'a yönlendiriyoruz.
            setLoading(false);
            navigate("/dashboard");
        }).catch((error) => {
            // Hata mesajını gösteriyoruz.
            setLoading(false);
            console.log(error);
            if (error.errors[0] === "Email or Password is wrong!") {
                Toast.fire({
                    icon: "error",
                    title: "Email veya şifre yanlış.",
                });
            }
            else {
                Toast.fire({
                    icon: "error",
                    title: error.errors[0],
                });
            }
        })
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <img src={bg} alt="description of" className={`object-cover w-full h-full absolute`} />
            {
                !loading ?
                    <div className="w-full p-6 m-auto bg-black/[0.6] rounded-md shadow-md lg:max-w-xl relative">
                        <h1 className="text-3xl font-semibold text-center text-white tracking-widest">
                            FIT<span className='text-green-500'>Z</span>ONE
                        </h1>
                        <form className="mt-6">
                            <div className="mb-2">
                                <label
                                    form="email"
                                    className="block text-sm font-semibold text-gray-300"
                                >
                                    Kullanıcı Adı
                                </label>
                                <input
                                    type="email"
                                    value={email} onChange={e => setEmail(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
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
                                    type="password"
                                    value={password} onChange={e => setPassword(e.target.value)}
                                    className="block w-full px-4 py-2 mt-2 text-gray-800 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                />
                            </div>
                            <a
                                href="/"
                                className="text-xs text-blue-600 hover:underline"
                            >
                                Şifreyi unuttun mu?
                            </a>
                            <div className="mt-6">
                                <button
                                    onClick={(e) => handleSubmit(e)}
                                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 
                            transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
                                    Oturum Aç
                                </button>
                            </div>
                        </form>

                        <p className="mt-8 text-xs font-light text-center text-gray-300">
                            {" "}
                            Hesabınız yok mu?{" "}
                            <a
                                href="/signup"
                                className="font-medium text-blue-600 hover:underline"
                            >
                                Kayıt Ol
                            </a>
                        </p>
                    </div>
                    :
                    <Spinner color='white' />
            }

        </div>
    )
}

export default Login;