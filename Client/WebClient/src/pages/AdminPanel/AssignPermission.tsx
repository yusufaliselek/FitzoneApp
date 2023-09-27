import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Content from '../../components/Content/Content'
import Header from '../../components/Header/Header'
import { FitzoneApi } from '../../services/fitzoneApi'
import TextInput from '../../components/TextInput/TextInput'
import { TrainerPermissionParams } from '../../utils/constants/TrainerPermissionParams'
import FButton from '../../components/Button/FButton'
import { AiFillCheckCircle, AiFillCloseCircle, AiOutlineArrowLeft } from 'react-icons/ai'
import Swal from 'sweetalert2';
import { GridColDef, trTR } from '@mui/x-data-grid'
import StyledDataGrid from '../../components/StyledDataGrid/StyledDataGrid'

const AssignPermission = () => {

    const { id } = useParams()
    const navigate = useNavigate()

    const [trainerPermission, setTrainerPermission] = useState(TrainerPermissionParams)
    const [trainers, setTrainers] = useState<any[]>([])

    const columns: GridColDef[] = [
        {
            field: 'userName',
            headerName: 'Kullanıcı Adı',
            minWidth: 200,
            editable: false,
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'E-Posta',
            minWidth: 200,
            editable: false,
            flex: 1,
        },
        {
            field: 'trainerPermissionName',
            headerName: 'Yetki',
            minWidth: 50,
            editable: false,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className='flex justify-center'>
                        {params.value ?
                            <AiFillCheckCircle color='green' size={20} />
                            :
                            <AiFillCloseCircle color='red' size={20} />
                        }
                    </div>
                )
            }
        },
        {
            field: 'id',
            headerName: 'Yetki',
            align: 'right',
            headerAlign: 'right',
            minWidth: 100,
            editable: false,
            flex: 1,
            renderCell: (params) => {
                return (
                    <div className='flex justify-center'>
                        {
                            params.row.trainerPermissionId === trainerPermission.id ?
                                <FButton text='Yetkiyi Sil' theme='danger' onClick={() => deletePermissionFromTrainer(trainerPermission.id, params.value)} />
                                :
                                <FButton text='Yetki Ver' onClick={() => assingPermissionToTrainer(trainerPermission.id, params.value)} />
                        }
                    </div>
                )
            }
        }
    ]

    const assingPermissionToTrainer = (permissionId: string, trainerId: string) => {
        if (!trainerId) return;
        Swal.fire({
            title: 'Antrenöre yetki vermek istediğinizden emin misiniz?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#6c757d',
            confirmButtonText: 'Evet, ver!',
            cancelButtonText: 'Hayır'
        }).then((result) => {
            if (result.isConfirmed) {
                FitzoneApi.AddTrainerPermissionToTrainerAsync(permissionId, trainerId).then((result) => {
                    console.log(result)
                    Swal.fire({
                        title: 'Antrenöre yetki verdiniz!',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 1500
                    })
                    setTrainers(result.data)
                })
            }
        })

    }

    const deletePermissionFromTrainer = (permissionId: string, trainerId: string) => {
        if (permissionId && trainerId) {
            Swal.fire({
                title: 'Antrenörün yetkisini almak istediğinizden emin misiniz?',
                text: "Bu işlemi geri alamazsınız!",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#6c757d',
                confirmButtonText: 'Evet, sil!',
                cancelButtonText: 'Hayır'
            }).then((result) => {
                if (result.isConfirmed) {
                    FitzoneApi.DeleteTrainerPermissionFromTrainerAsync(permissionId, trainerId).then((result) => {
                        setTrainers(result.data)
                        Swal.fire({
                            title: 'Antrenör yetkisini aldınız!',
                            icon: 'success',
                            showConfirmButton: false,
                            timer: 1500
                        })
                    })
                }
            })
        }
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
                        <div className='flex flex-col gap-5 w-2/3'>
                            <div className='flex gap-3 items-end'>
                                <div className='p-3 cursor-pointer hover:bg-gray-300' onClick={() => { navigate('/admin/') }}>
                                    <AiOutlineArrowLeft color='rgb(59 130 250)' size={20} />
                                </div>
                                <TextInput label="Yetki Adı" value={trainerPermission.name} disabled />

                            </div>
                            <div className='w-full h-[calc(100vh-200px)]'>
                                <StyledDataGrid columns={columns} rows={trainers} localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                                />
                            </div>
                        </div>
                    </div>
                }
            </div>
        } />
    )
}

export default AssignPermission