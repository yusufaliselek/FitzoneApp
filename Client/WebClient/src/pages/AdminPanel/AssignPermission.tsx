import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Content from '../../components/Content/Content'
import Header from '../../components/Header/Header'
import { FitzoneApi } from '../../services/fitzoneApi'
import TextInput from '../../components/TextInput/TextInput'
import { TrainerPermissionParams } from '../../utils/constants/TrainerPermissionParams'
import FButton from '../../components/Button/FButton'
import { AiFillCaretLeft, AiFillLeftSquare, AiOutlineArrowLeft } from 'react-icons/ai'

const AssignPermission = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const [trainerPermission, setTrainerPermission] = useState(TrainerPermissionParams)
    const [trainers, setTrainers] = useState<any>([])

    const assingPermissionToTrainer = (trainerId: string) => {
        const data = {
            trainerId: trainerId,
            permissionId: id
        }
        FitzoneApi.UpdateTrainerPermissionTrainer(data).then((result) => {
            console.log(result)
        })
    }

    useEffect(() => {
        if (!id) {
            navigate('/dashboard')
        }
        Promise.all([
            FitzoneApi.GetTrainersWithPermissionIncludeNoOtherIdByPermissionIdAsync(String(id)),
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
                            <div className='flex gap-3 items-end'>
                                <div className='p-3 cursor-pointer hover:bg-gray-300' onClick={()=> { navigate('/admin/')}}>
                                    <AiOutlineArrowLeft color='rgb(59 130 250)' size={20} />
                                </div>
                                <TextInput label="Yetki Adı" value={trainerPermission.name} disabled />
                            </div>
                            {trainers.map((trainer: any) => {
                                return (
                                    <div
                                        key={trainer.id}
                                        className="flex justify-between items-center bg-gray-50 gap-2 border border-gray-300 rounded-md p-2 hover:scale-[1.01] transition-all cursor-pointer"
                                    >
                                        <label className="ml-2 text-gray-700">{trainer.userName} - {trainer.email}</label>
                                        <div className='w-fit'>
                                            {
                                                trainer.trainerPermissionId === trainerPermission.id ?
                                                <FButton text='Yetkiyi Sil' theme='danger'/>
                                                :
                                                <FButton text='Yetki Ver' onClick={() => assingPermissionToTrainer(trainer.id)} />
                                            }
                                            
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