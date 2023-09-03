import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Nav from '../../components/Nav/Nav';
import FitzoneHeader from '../../components/Header/FitzoneHeader';
import { FitzoneApi } from '../../services/fitzoneApi';
import { motion } from 'framer-motion';
import { BsPersonBadgeFill } from 'react-icons/bs';
import TextInput from '../../components/TextInput/TextInput';
import FButton from '../../components/Button/FButton';
import SelectInput from '../../components/SelectInput/SelectInput';
import { cities } from '../../assets/Cities';
import { TbListDetails } from 'react-icons/tb';
import genders from '../../assets/Genders';
import Cookies from 'js-cookie';
import { decodeJwt } from 'jose';
import Toast from '../../components/Toast/Toast';

const trainerParams = {
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

const trainerDetailsParams = {
    id: "",
    trainerId: "",
    biography: "",
    location: "",
    profession: "",
    qualification: "",
    createdAt: "",
    updatedAt: "",
}

const TrainerDetail = () => {

    const params = useParams();
    const navigate = useNavigate();

    const [trainer, setTrainer] = useState(trainerParams);
    const [trainerDetails, setTrainerDetails] = useState(trainerDetailsParams);
    const [detailsIsOpen, setDetailsIsOpen] = useState<boolean>(false);
    const [isAdmin, setIsAdmin] = useState<boolean>(false);

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
        Promise.all([
            FitzoneApi.GetUserById(String(params.id)),
            FitzoneApi.GetTrainerDetailByTrainerId(String(params.id))
        ]).then((response) => {
            const [trainerById, trainerDetail] = response;
            setTrainer(trainerById.data);
            setTrainerDetails(trainerDetail.data);
        }).catch((error) => {
            console.log(error);
            RefreshToken();
        })
        setIsAdmin(decodeJwt(String(Cookies.get('token')))?.typ === 'admin');
        // eslint-disable-next-line react-hooks/exhaustive-deps

    }, [])

    const handleChangeForm = (e: any) => {
        setTrainer({ ...trainer, [e.target.id]: e.target.value });
    }

    const handleDetailChangeForm = (e: any) => {
        setTrainerDetails({ ...trainerDetails, [e.target.id]: e.target.value });
    }

    const updateUser = () => {
        Toast.fire({
            icon: 'info',
            title: 'Güncelleniyor...'
        })
        FitzoneApi.UpdateUser(trainer).then((res) => {
            Toast.fire({
                icon: 'success',
                title: 'Kullanıcı bilgileri güncellendi.'
            })
            navigate('/trainers/')
        })
    }

    return (
        <div className='flex w-screen h-screen'>
            {/* Navbar */}
            <Nav pageName='Antrenörler' />
            <div className='flex flex-col w-full h-screen'>
                {/* Header */}
                <FitzoneHeader pageName='Antrenör Bilgisi' />
                <div className='w-full h-[calc(100vh-65px)] p-5 flex justify-center'>
                    {/* FORM SIDE */}
                    <motion.div
                        className={`w-2/5 gap-4 mt-[3%] p-5 ${!detailsIsOpen ? "flex flex-col" : "hidden"}`}
                    >
                        <div className='mt-3 flex items-center justify-center'>
                            <BsPersonBadgeFill size={40} color='lightgray' />
                        </div>
                        <div className='flex gap-3'>
                            <TextInput id='firstName' label='Ad' value={trainer.firstName} onChange={handleChangeForm} disabled={!isAdmin} />
                            <TextInput id='lastName' label='Soyad' value={trainer.lastName} onChange={handleChangeForm} disabled={!isAdmin} />
                        </div>
                        <div className='flex gap-3'>
                            <TextInput id='email' label='E-Posta' value={trainer.email} onChange={handleChangeForm} disabled />
                            <TextInput id='userName' label='Kullanıcı Adı' value={trainer.userName} onChange={handleChangeForm} disabled />
                        </div>
                        <div className='flex gap-3'>
                            <TextInput id='phoneNumber' label='Telefon Numarası' value={trainer.phoneNumber} onChange={handleChangeForm} disabled={!isAdmin} />
                            <TextInput id='tckno' label='TCKNO' value={trainer.tckno} onChange={handleChangeForm} disabled={!isAdmin} />
                        </div>
                        <div className='flex gap-3'>
                            <SelectInput id='gender' label='Cinsiyet' value={trainer.gender} onChange={(e) => setTrainer({ ...trainer, gender: e.target.value })} options={genders} disabled={!isAdmin} />
                            <TextInput id='birthdayDate' label='Doğum Tarihi' value={trainer.birthdayDate} onChange={handleChangeForm} type='date' disabled={!isAdmin} />
                        </div>
                        {/* SUBMIT */}
                        <div className='flex mt-3 flex-col gap-3'>
                            {
                                isAdmin && <FButton text='Kaydet' theme='primary' onClick={updateUser} />
                            }
                            <FButton text='Detayları Göster' theme='dark' onClick={() => setDetailsIsOpen(true)} />
                        </div>
                    </motion.div>
                    <motion.div className={`w-2/5 gap-4 mt-[3%] p-5 ${detailsIsOpen ? "flex flex-col" : "hidden"}`}
                    >
                        <div className='mt-3 flex items-center justify-center'>
                            <TbListDetails size={40} color='lightgray' />
                        </div>
                        <div className='w-full text-blue-700'> <label
                            htmlFor={"biography"}
                            className="block mb-2 text-sm font-medium pl-1">
                            Biyografi
                        </label>
                            <textarea id='biography' aria-label='Biyografi' value={trainerDetails.biography}
                                className="bg-gray-50 border focus:border-blue-500  text-sm rounded-lg  w-full p-2.5 outline-0  focus:ring-blue-300
                             focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setTrainerDetails({ ...trainerDetails, biography: e.target.value })}
                                disabled={!isAdmin} />
                        </div>

                        <TextInput id='profession' label='Uzmanlık' value={trainerDetails.profession} onChange={handleDetailChangeForm} disabled={!isAdmin} />
                        <TextInput id='qualification' label='Nitelik' value={trainerDetails.qualification} onChange={handleDetailChangeForm} disabled={!isAdmin} />
                        <SelectInput value={trainerDetails.location} id='location' label='Şehir Seçiniz' options={cities.map((item) => ({ value: String(item.plaka), text: item.il_adi }))}
                            onChange={(e) => setTrainerDetails({ ...trainerDetails, location: e.target.value })}
                            disabled={!isAdmin} />
                        {/* SUBMIT */}
                        <div className='flex mt-3 flex-col gap-3'>
                            {
                                isAdmin && <FButton text='Detayları Kaydet' theme='primary' onClick={updateUser} />
                            }
                            <FButton text='Genel Bilgileri Göster' theme='dark' onClick={() => setDetailsIsOpen(false)} />
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}

export default TrainerDetail