import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Cookies from 'js-cookie';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Nav from '../../components/Nav/Nav';
import { FitzoneApi } from '../../services/fitzoneApi';
import { BsDiagram3, BsPersonCircle } from 'react-icons/bs';
import { decodeJwt } from 'jose';
import TextInput from '../../components/TextInput/TextInput';
import { TabPanel, a11yProps } from '../../utils/funcs/TabPanel';
import SelectInput from '../../components/SelectInput/SelectInput';
import FButton from '../../components/Button/FButton';
import { GetUserIdFromToken } from '../../utils/funcs/GetUserIdFromToken';
import Toast from '../../components/Toast/Toast';
import { RiLockPasswordFill } from 'react-icons/ri';
import { IGetTrainerPermissionById } from '../../types/Types';
import { BiCheckbox, BiCheckboxChecked } from 'react-icons/bi';
import { TbListDetails } from 'react-icons/tb';
import { motion } from 'framer-motion';
import { cities } from '../../assets/Cities';
import genders from '../../assets/Genders';
import { AntTab, AntTabs } from '../../components/Tabs/Tabs';

const trainerPermissionParamCheckboxes = [
    'canCreateUser', 'canEditUser', 'canDeleteUser', 'canCreateRole', 'canEditRole',
    'canDeleteRole', 'canCreateTraining', 'canEditTraining', 'canDeleteTraining',
    'canCreateTrainingCategory', 'canEditTrainingCategory', 'canDeleteTrainingCategory',
    'canCreateMember', 'canEditMember', 'canDeleteMember', 'canSetRole'
];

const trainerPermissionParamLabels = [
    'Kullanıcı Oluşturabilir', 'Kullanıcı Düzenleyebilir', 'Kullanıcı Silebilir', 'Rol Oluşturabilir', 'Rol Düzenleyebilir',
    'Rol Silebilir', 'Eğitim Oluşturabilir', 'Eğitim Düzenleyebilir', 'Eğitim Silebilir', 'Eğitim Kategorisi Oluşturabilir',
    'Eğitim Kategorisi Düzenleyebilir', 'Eğitim Kategorisi Silebilir', 'Üye Oluşturabilir', 'Üye Düzenleyebilir',
    'Üye Silebilir', 'Rol Atayabilir'
];

const trainerPermissionParams: IGetTrainerPermissionById = {
    id: '',
    name: '',
    canCreateUser: false,
    canEditUser: false,
    canDeleteUser: false,
    canCreateRole: false,
    canEditRole: false,
    canDeleteRole: false,
    canCreateTraining: false,
    canEditTraining: false,
    canDeleteTraining: false,
    canCreateTrainingCategory: false,
    canEditTrainingCategory: false,
    canDeleteTrainingCategory: false,
    canCreateMember: false,
    canEditMember: false,
    canDeleteMember: false,
    canSetRole: false,
};

const trainerParams = {
    birthdayDate: "",
    createdAt: "",
    email: "",
    firstName: "",
    gender: "",
    id: "",
    lastName: "",
    photoId: null,
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

const passwordForm = {
    oldPassword: "",
    newPassword: "",
    newPasswordAgain: ""
}

let trainerDetailAction: "create" | "update";

const Settings = () => {

    const navigate = useNavigate()

    const [value, setValue] = useState(0);

    const [trainer, setTrainer] = useState(trainerParams);

    const [trainerDetails, setTrainerDetails] = useState(trainerDetailsParams);

    const [detailsIsOpen, setDetailsIsOpen] = useState(false);

    const [passwordParams, setPasswordParams] = useState(passwordForm);

    // Trainer Permission Form State -- And With Edit
    const [trainerPermissionForm, setTrainerPermissionForm] = useState<IGetTrainerPermissionById>(trainerPermissionParams);


    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

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

    // User Update
    const handleChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.id, event.target.value)
        setTrainer({ ...trainer, [event.target.id]: event.target.value });
    }


    const updateUser = () => {
        Toast.fire({
            icon: 'info',
            title: 'Kullanıcı bilgileri güncelleniyor...'
        })
        FitzoneApi.UpdateUser(trainer).then((response) => {
            Toast.fire({
                icon: 'success',
                title: 'Kullanıcı bilgileri güncellendi'
            })
        }).catch((error) => {
            console.log(error);
            Toast.fire({
                icon: 'error',
                title: 'Kullanıcı bilgileri güncellenemedi'
            })
        })
    }

    // Detail Update
    const handleDetailChangeForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTrainerDetails({ ...trainerDetails, [event.target.id]: event.target.value });
    }

    const createOrUpdateTrainerDetail = (action: "create" | "update") => () => {
        Toast.fire({
            icon: 'info',
            title: 'Detaylar kaydediliyor...'
        })
        if (action === "create") {
            trainerDetails.trainerId = trainer.id;
            trainerDetails.createdAt = new Date().toString();
            trainerDetails.updatedAt = new Date().toString();
            FitzoneApi.CreateTrainerDetail(trainerDetails).then((response) => {
                Toast.fire({
                    icon: 'success',
                    title: 'Detaylar kaydedildi'
                })
            }).catch((error) => {
                Toast.fire({
                    icon: 'error',
                    title: 'Detaylar kaydedilemedi'
                })
            });
        }
        if (action === "update") {
            trainerDetails.updatedAt = new Date().toString();
            FitzoneApi.UpdateTrainerDetail(trainerDetails).then((response) => {
                Toast.fire({
                    icon: 'success',
                    title: 'Detaylar güncellendi'
                })
            }).catch((error) => {
                Toast.fire({
                    icon: 'error',
                    title: 'Detaylar kaydedilemedi'
                })
            });
        }
    }

    // Password Update

    const changePassword = () => {
        if (passwordParams.newPassword !== passwordParams.newPasswordAgain) {
            Toast.fire({
                icon: 'error',
                title: 'Yeni girdiğiniz şifreler aynı değil'
            })
            return;
        }
        Toast.fire({
            icon: 'info',
            title: 'Şifre güncelleniyor...'
        })
        const value = {
            id: trainer.id,
            currentPassword: passwordParams.oldPassword,
            newPassword: passwordParams.newPassword
        }
        FitzoneApi.ChangePassword(value).then((response) => {
            Toast.fire({
                icon: 'success',
                title: 'Şifre güncellendi'
            })
            setPasswordParams(passwordForm);
            clearToken();
        }).catch((error) => {
            if (error.errors[0] === "Incorrect password.") {
                Toast.fire({
                    icon: 'error',
                    title: 'Eski şifrenizi yanlış girdiniz'
                })
                return;
            }
            console.log(error);
            Toast.fire({
                icon: 'error',
                title: 'Şifre güncellenemedi'
            })
        })
    }

    const handleChandePasswordForm = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordParams({ ...passwordParams, [event.target.id]: event.target.value });
    }

    useEffect(() => {
        RefreshToken();
        Promise.all([
            FitzoneApi.GetUserById(String(GetUserIdFromToken())),
            FitzoneApi.GetTrainerDetailByTrainerId(String(GetUserIdFromToken())),
        ]).then((response) => {
            const [user, trainerDetail] = response;
            if (trainerDetail.data.id === null) {
                trainerDetailAction = "create";
                setTrainerDetails(trainerDetailsParams);
            } else {
                trainerDetailAction = "update";
                setTrainerDetails(trainerDetail.data);
            }
            setTrainer(user.data);
        }).catch((error) => {
            console.log(error);
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='flex w-screen h-screen'>
            {/* Navbar */}
            <Nav pageName='Ayarlar' />
            <div className='flex flex-col w-full h-screen'>
                {/* Header */}
                <Header pageName='Ayarlar' />
                <Box sx={{ width: '100%', paddingX: 2, overflowY: "auto", height: "calc(100vh-112px)" }}>
                    <AntTabs value={value} onChange={handleChange}>
                        <AntTab label="Bilgilerim" {...a11yProps(0)} />
                        <AntTab label="Güvenlik Ayarlarım" {...a11yProps(1)} />
                        <AntTab label="Yetkilerim" {...a11yProps(2)} />
                    </AntTabs>
                    <TabPanel value={value} index={0}>
                        <div className='w-full h-[calc(100vh-112px)] overflow-y-auto flex flex-col gap-2 items-center'>
                            {/* FORM SIDE */}
                            <motion.div
                                className={`w-2/5 gap-4 mt-[3%] p-5 ${!detailsIsOpen ? "flex flex-col" : "hidden"}`}
                            >
                                <div className='mt-3 flex items-center justify-center'>
                                    {
                                        trainer.photoId === null ?
                                            <BsPersonCircle size={40} color='lightgray' /> :
                                            <img src={"https://localhost:7045/api/Trainer/TrainerPhoto/" + trainer.id} alt='user' className=' w-20 h-20 bg-cover bg-center rounded-3xl' />
                                    }
                                </div>
                                <div className='flex gap-3'>
                                    <TextInput id='firstName' label='Ad' value={trainer.firstName} onChange={handleChangeForm} />
                                    <TextInput id='lastName' label='Soyad' value={trainer.lastName} onChange={handleChangeForm} />
                                </div>
                                <div className='flex gap-3'>
                                    <TextInput id='email' label='E-Posta' value={trainer.email} onChange={handleChangeForm} disabled />
                                    <TextInput id='userName' label='Kullanıcı Adı' value={trainer.userName} onChange={handleChangeForm} disabled />
                                </div>
                                <div className='flex gap-3'>
                                    <TextInput id='phoneNumber' label='Telefon Numarası' value={trainer.phoneNumber} onChange={handleChangeForm} />
                                    <TextInput id='tckno' label='TCKNO' value={trainer.tckno} onChange={handleChangeForm} />
                                </div>
                                <div className='flex gap-3'>
                                    <SelectInput id='gender' label='Cinsiyet' value={trainer.gender} onChange={(e) => setTrainer({ ...trainer, gender: e.target.value })} options={genders} />
                                    <TextInput id='birthdayDate' label='Doğum Tarihi' value={trainer.birthdayDate} onChange={handleChangeForm} type='date' />
                                </div>
                                {/* SUBMIT */}
                                <div className='flex mt-3 flex-col gap-3'>
                                    <FButton text='Kaydet' onClick={updateUser} />
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
                                    <textarea id='biography' aria-label='Biyografi' value={trainerDetails.biography} className="bg-gray-50 border focus:border-blue-500  text-sm rounded-lg  w-full p-2.5 outline-0  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                                        onChange={(e) => setTrainerDetails({ ...trainerDetails, biography: e.target.value })} />
                                </div>

                                <TextInput id='profession' label='Uzmanlık' value={trainerDetails.profession} onChange={handleDetailChangeForm} />
                                <TextInput id='qualification' label='Nitelik' value={trainerDetails.qualification} onChange={handleDetailChangeForm} />
                                <SelectInput value={trainerDetails.location} id='location' label='Şehir Seçiniz' options={cities.map((item) => ({ value: String(item.plaka), text: item.il_adi }))}
                                    onChange={(e) => setTrainerDetails({ ...trainerDetails, location: e.target.value })}
                                />
                                {/* SUBMIT */}
                                <div className='flex mt-3 flex-col gap-3'>
                                    <FButton text='Detayları Kaydet' onClick={createOrUpdateTrainerDetail(trainerDetailAction)} />
                                    <FButton text='Detayları Gizle' theme='dark' onClick={() => setDetailsIsOpen(false)} />
                                </div>
                            </motion.div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <div className='w-full h-[calc(100vh-112px)] overflow-y-auto flex flex-col gap-2 items-center'>
                            {/* FORM SIDE */}
                            <div className='flex flex-col w-2/5 gap-4 mt-[3%] p-5'>
                                <div className='mt-3 flex items-center justify-center'>
                                    <RiLockPasswordFill size={40} color='lightgray' />
                                </div>
                                <TextInput id='oldPassword' label='Eski Şifrenizi Giriniz' value={passwordParams.oldPassword} onChange={handleChandePasswordForm} type='password' />
                                <TextInput id='newPassword' label='Yeni Şifrenizi Giriniz' value={passwordParams.newPassword} onChange={handleChandePasswordForm} type='password' />
                                <TextInput id='newPasswordAgain' label='Yeni Şifrenizi Tekrar Giriniz' value={passwordParams.newPasswordAgain} onChange={handleChandePasswordForm} type='password' />
                                {/* SUBMIT */}
                                <div className='flex mt-3'>
                                    <FButton text='Şifre Değiştir' theme='danger' onClick={changePassword} />
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <div className='w-full h-[calc(100vh-112px)] overflow-y-auto flex flex-col gap-2 items-center'>
                            {/* FORM SIDE */}
                            <div className='flex flex-col xl:w-2/5 gap-4 mt-[3%] p-5'>
                                <div className='flex items-center justify-center'>
                                    <BsDiagram3 size={40} color='lightgray' />
                                </div>
                                <div className='flex gap-3 justify-center'>
                                    <span className='font-medium'>Kullanıcı Yetkisi:</span>
                                    <span>{trainer.role === "admin" ? "Yönetici" : ""}</span>
                                </div>
                                <div className='flex flex-col justify-center mt-2 max-h-full overflow-y-auto'>
                                    {trainerPermissionParamCheckboxes.map((item, index) => (
                                        <div key={index} className={`flex items-center gap-2 py-1 w-full ${index === 0 ? "" : "border-t"} justify-between`}>
                                            <span>{trainerPermissionParamLabels[index]}</span>
                                            {trainer.role === "admin" ? <BiCheckboxChecked size={20} color='green' /> :
                                                <span>{Boolean(trainerPermissionForm[item as keyof IGetTrainerPermissionById]) ? <BiCheckboxChecked size={20} color='green' /> : <BiCheckbox size={20} color='red' />}</span>}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </TabPanel>
                </Box>
            </div>
        </div >
    )
}

export default Settings