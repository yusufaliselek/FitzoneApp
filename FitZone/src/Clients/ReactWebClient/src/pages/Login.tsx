import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import fitzonebg from '../assets/fitzonebg.gif'
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Spinner from '../components/Spinner/Spinner';

const MySwal = withReactContent(Swal);
const Toast = MySwal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 2000,
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>): void => {
        e.preventDefault();
        if (username === "admin" && password === "admin") {
            setLoading(true);
            setTimeout(()=> {
                navigate("/dashboard");
            },1500)
        }
        else {
            Toast.fire({
                icon: "error",
                title: "Lütfen bilgilerinizi kontrol ediniz!",
              });
        }
    }

    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <img src={fitzonebg} alt="description of" className={`object-cover w-full h-full absolute`} />
            {
                !loading ? 
                <div className="w-full p-6 m-auto bg-black/[0.6] rounded-md shadow-md lg:max-w-xl relative">
                <h1 className="text-3xl font-semibold text-center text-white tracking-widest">
                    FIT<span className='text-orange-500'>Z</span>ONE
                </h1>
                <form className="mt-6">
                    <div className="mb-2">
                        <label
                            form="username"
                            className="block text-sm font-semibold text-gray-300"
                        >
                            Kullanıcı Adı
                        </label>
                        <input
                            type="text"
                            value={username} onChange={e => setUsername(e.target.value)}
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
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
                            className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md 
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
            <Spinner color='white'/>
            }

        </div>
    )
}

export default Login;