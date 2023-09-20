import React, { useEffect, useState } from 'react'
import Swal from 'sweetalert2';
import Toast from '../../components/Toast/Toast';
import { FitzoneApi } from '../../services/fitzoneApi';
import { useNavigate } from 'react-router-dom';
import { GridColDef, trTR } from '@mui/x-data-grid';
import { BiShow, BiUserCheck } from 'react-icons/bi';
import { Tooltip } from '@mui/material';
import { AiFillDelete } from 'react-icons/ai';
import StyledDataGrid from '../../components/StyledDataGrid/StyledDataGrid';
import TextInput from '../../components/TextInput/TextInput';

const PassiveTrainers = () => {

    // Default State
    const navigate = useNavigate();

    // Freeze Trainer States
    const [passiveTrainers, setPassiveTrainers] = useState<any[]>([]);

    useEffect(() => {
        getAllPassiveTrainers();
    }, []);

    const columnsPassiveTrainer: GridColDef[] = [
        {
            field: 'userName',
            headerName: 'Kullanıcı Adı',
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'firstName',
            headerName: 'Ad',
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'lastName',
            headerName: 'Soyad',
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'email',
            headerName: 'Email',
            minWidth: 300,
            flex: 1,
        },
        {
            field: 'phoneNumber',
            headerName: 'Telefon',
            minWidth: 200,
            flex: 1,
        },
        {
            field: 'id',
            headerName: 'İşlemler',
            flex: 1,
            minWidth: 200,
            align: 'right',
            headerAlign: 'right',
            renderCell: (params) => (
                <div className='flex gap-3 pr-2'>
                    <Tooltip title="Antrenör Detayı">
                        <button onClick={() => navigate(`/trainers/${params.value}`)} className='flex items-center justify-center p-2 rounded-full text-blue-400 hover:bg-gray-300 hover:text-blue-500 transition-all'>
                            <BiShow className='w-5 h-5' />
                        </button>
                    </Tooltip>
                    <Tooltip title="Antrenörü Aktif Et">
                        <button onClick={() => unfreezeTrainer(params.value)} className='flex items-center justify-center p-2 rounded-full text-green-600 hover:bg-gray-300 hover:text-green-700 transition-all'>
                            <BiUserCheck className='w-5 h-5' />
                        </button>
                    </Tooltip>
                    <Tooltip title="Antrenörü Sil">
                        <button onClick={() => deleteTrainer(params.value)} className='flex items-center justify-center p-2 rounded-full text-red-400 hover:bg-gray-300 hover:text-red-500 transition-all'>
                            <AiFillDelete className='w-5 h-5' />
                        </button>
                    </Tooltip>
                </div>
            )
        }
    ]

    const getAllPassiveTrainers = () => {
        FitzoneApi.GetAllPassiveTrainers().then(res => {
            setPassiveTrainers(res.data);
        })
    }

    const deleteTrainer = (id: string) => {
        Swal.fire({
            title: 'Antrenörü silmek istediğinizden emin misiniz?',
            text: passiveTrainers.filter(item => item.id === id)[0].email + " - " + passiveTrainers.filter(item => item.id === id)[0].userName,
            showDenyButton: true,
            confirmButtonText: `Sil`,
            denyButtonText: `Vazgeç`,
            confirmButtonColor: '#dc3545',
            denyButtonColor: '#6c757d',
        }).then((result) => {
            if (result.isConfirmed) {
                FitzoneApi.DeleteTrainerDetailByTrainerId(id).then(res => {
                    FitzoneApi.DeleteTrainer(id).then(res => {
                        Toast.fire({
                            icon: 'success',
                            title: 'Antrenör silindi'
                        });
                        getAllPassiveTrainers();
                    })
                }).catch(err => {
                    Toast.fire({
                        icon: 'error',
                        title: 'Antrenör silinemedi'
                    });
                });
            } else if (result.isDenied) {
                return;
            }
        })
    }

    const unfreezeTrainer = (id: string) => {
        Swal.fire({
            title: 'Aktif etmek istediğinizden emin misiniz?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Evet, aktif et!',
            cancelButtonText: 'Hayır'
        }).then((result) => {
            if (result.isConfirmed) {
                Toast.fire({
                    icon: 'info',
                    title: 'Antrenör aktif ediliyor...'
                });
                FitzoneApi.UnFreezeTrainer(id).then(res => {
                    console.log(res);
                    Toast.fire({
                        icon: 'success',
                        title: 'Antrenör aktif edildi'
                    });
                    getAllPassiveTrainers();
                }).catch((error) => {
                    console.log(error);
                    Toast.fire({
                        icon: 'error',
                        title: 'Antrenör aktif edilemedi'
                    });
                })
            }
        })
    }
    return (
        <div className='h-[calc(100vh-112px)] overflow-y-auto flex flex-col gap-2 items-center'>
            <div className='w-full px-1 mt-5'>
                <TextInput placeholder='Hızlı Ara..' value={""} onChange={(e) => { }} />
            </div>
            <div className='w-full h-full'>
                <StyledDataGrid
                    rows={passiveTrainers}
                    columns={columnsPassiveTrainer}
                    localeText={trTR.components.MuiDataGrid.defaultProps.localeText}
                    disableColumnFilter={true}
                    disableColumnMenu={true}
                    disableColumnSelector={true}
                />
            </div>
        </div>
    )
}

export default PassiveTrainers