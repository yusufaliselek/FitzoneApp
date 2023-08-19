import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import React, { useState } from 'react';
import DataTable from 'react-data-table-component';
import { RiDeleteBin5Line, RiEdit2Line } from 'react-icons/ri';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import NoDataComponent from '../../components/NoDataComponent/NoDataComponent';
import { ITrainerClub, ITrainerUserProps } from '../../types/Types';

interface UserClubsProps {
    columnsClub: any;
    openClubDialog: () => void;
    closeClubDialog: () => void;
    clubDialog: boolean;
    trainerClub: ITrainerClub;
    setUserClub: React.Dispatch<React.SetStateAction<ITrainerClub>>;
    cancelClubDialog: () => void;
    trainerProps: ITrainerUserProps;
    rowsConsole: ({ selectedRows }: {
        selectedRows: any;
    }) => void;
    paginationComponentOptions: {
        rowsPerPageText: string;
        rangeSeparatorText: string;
    };
    setUserProps: React.Dispatch<React.SetStateAction<ITrainerUserProps>>;
}



const TrainerClubs = (props: UserClubsProps) => {

    return (
        <>
            <div className='col-span-2 mb-2 w-full flex flex-col'>
                <div className='flex justify-between py-1 items-center'>
                    <label
                        form="trainerClubs"
                        className="block text-sm font-semibold text-gray-600"
                    >
                        Kulüpler
                    </label>
                    <Button variant="outlined" onClick={props.openClubDialog}>
                        Kulüp Ekle
                    </Button>
                </div>
                <Dialog open={props.clubDialog} onClose={props.closeClubDialog}>
                    <DialogTitle>Kulüp Bilgileri</DialogTitle>
                    <DialogContent>
                        <div className="mb-2 w-full">
                            <label
                                form="clubName"
                                className="block text-sm font-semibold text-gray-600"
                            >
                                Kulüp Adı
                            </label>
                            <input
                                type="text"
                                value={props.trainerClub.name} onChange={e => props.setUserClub({ ...props.trainerClub, name: e.target.value })}
                                className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2 w-full">
                            <label
                                form="role"
                                className="block text-sm font-semibold text-gray-600"
                            >
                                Kulüpteki Rol
                            </label>
                            <input
                                type="text"
                                value={props.trainerClub.role} onChange={e => props.setUserClub({ ...props.trainerClub, role: e.target.value })}
                                className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2 w-full">
                            <label
                                form="clubDescription"
                                className="block text-sm font-semibold text-gray-600"
                            >
                                Açıklama
                            </label>
                            <textarea
                                value={props.trainerClub.description} onChange={e => props.setUserClub({ ...props.trainerClub, description: e.target.value })}
                                className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2 w-full">
                            <label
                                form="clubEnterDate"
                                className="block text-sm font-semibold text-gray-600"
                            >
                                Kulübe Giriş Tarihi
                            </label>
                            <input
                                type="date"
                                value={props.trainerClub.entryDate} onChange={e => { props.setUserClub({ ...props.trainerClub, entryDate: e.target.value }) }}
                                className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md cursor-pointer
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2 w-full">
                            <label
                                form="clubExitDate"
                                className="block text-sm font-semibold text-gray-600"
                            >
                                Kulüpten Ayrılma Tarihi
                            </label>
                            <input
                                type="date"
                                value={props.trainerClub.leaveDate} onChange={e => { props.setUserClub({ ...props.trainerClub, leaveDate: e.target.value }) }}
                                className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md cursor-pointer
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.cancelClubDialog}>İptal</Button>
                        <Button onClick={props.closeClubDialog}>Ekle</Button>
                    </DialogActions>
                </Dialog>
                <DataTable
                    noDataComponent={<NoDataComponent text='Kulüp Bulunamadı' />}
                    columns={props.columnsClub}
                    data={props.trainerProps.trainerClubs ?? []}
                    selectableRows
                    pagination
                    highlightOnHover
                    onSelectedRowsChange={props.rowsConsole}
                    paginationComponentOptions={props.paginationComponentOptions}
                />
            </div>
        </>
    )
}

export default TrainerClubs