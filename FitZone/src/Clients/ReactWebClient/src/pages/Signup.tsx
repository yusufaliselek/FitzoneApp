import React from 'react';
import cardio from '../assets/cardio.jpg'

const Signup = () => {
    return (
        <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
            <img src={cardio} alt="description of" className={`object-cover w-full h-full absolute`} />
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
                                className="block w-full px-4 py-2 mt-2 text-blue-700 bg-white border rounded-md focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>

                        <div className="mt-6">
                            <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-700 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600">
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