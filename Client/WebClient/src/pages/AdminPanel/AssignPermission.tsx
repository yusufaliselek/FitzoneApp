import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Content from '../../components/Content/Content'
import Header from '../../components/Header/Header'
import { FitzoneApi } from '../../services/fitzoneApi'
import TextInput from '../../components/TextInput/TextInput'
import { TrainerPermissionParams } from '../../utils/constants/TrainerPermissionParams'
import { motion } from 'framer-motion'
import FButton from '../../components/Button/FButton'
import Spinner from '../../components/Spinner/Spinner'

const AssignPermission = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [trainerPermission, setTrainerPermission] = useState(TrainerPermissionParams)
    const [trainers, setTrainers] = useState<any>([])

    useEffect(() => {
        if (!id) {
            navigate('/dashboard')
        }
        Promise.all([
            FitzoneApi.GetAllActiveTrainers(),
            FitzoneApi.GetTrainerPermissionById(String(id))
        ]).then((result) => {
            const [trainers, permission] = result
            setTrainers(trainers.data)
            setTrainerPermission(permission.data)
        })
    }, [])


    return (
        <Content title='Yetki Ata' content={
            <div className='flex flex-col w-full h-screen'>
                <Header pageName='Yetki Ata' />
                {
                    trainerPermission.name &&
                    <div className='w-full h-[calc(100vh-65px)] p-5 flex justify-center'>
                        <div className='flex flex-col gap-5 w-1/2'>
                            <TextInput label="Yetki Adı" value={trainerPermission.name} disabled />
                            {trainers.map((trainer: any) => {
                                return (
                                    <div
                                        key={trainer.id}
                                        className="flex justify-between items-center bg-gray-50 gap-2 border border-gray-300 rounded-md p-2 hover:scale-[1.01] transition-all cursor-pointer"
                                    >
                                        <label className="ml-2 text-gray-700">{trainer.userName} - {trainer.email}</label>
                                        <div className='w-fit'>
                                            <FButton text='Yetki Ver' onClick={() => console.log(trainer.id)} />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>

                }
            </div>
        } />
    )
}

export default AssignPermission