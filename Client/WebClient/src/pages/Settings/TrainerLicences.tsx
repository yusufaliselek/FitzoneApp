import React from 'react'
import { ITrainerLicence, ITrainerUserProps } from '../../types/Types';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import DataTable from 'react-data-table-component';

interface UserLicencesProps {
    trainerLicences: ITrainerLicence[];
    openLicenceDialog: () => void;
    closeLicenceDialog: () => void;
    licenceDialog: boolean;
    trainerLicence: ITrainerLicence;
    setUserLicence: React.Dispatch<React.SetStateAction<ITrainerLicence>>;
    cancelLicenceDialog: () => void;
    trainerProps: ITrainerUserProps;
    columns: ({
        name: string;
        selector: (row: any) => any;
        cell?: undefined;
    } | {
        name: string;
        selector: (row: any) => any;
        cell: (row: any) => JSX.Element;
    })[];
    rowsConsole: ({ selectedRows }: {
        selectedRows: any;
    }) => void;
    paginationComponentOptions: {
        rowsPerPageText: string;
        rangeSeparatorText: string;
    };
}

const TrainerLicences = (props: UserLicencesProps) => {
    return (
        <>
            <div className='col-span-2 mb-2 w-full flex flex-col'>
                <div className='flex justify-between py-1 items-center'>
                    <label
                        form="trainerLicences"
                        className="block text-sm font-semibold text-gray-600"
                    >
                        Lisanslar
                    </label>
                    <Button variant="outlined" onClick={props.openLicenceDialog}>
                        Lisans Ekle
                    </Button>
                </div>
                <Dialog open={props.licenceDialog} onClose={props.closeLicenceDialog}>
                    <DialogTitle>Lisans Bilgileri</DialogTitle>
                    <DialogContent>
                        <div className="mb-2 w-full">
                            <label
                                form="licenceName"
                                className="block text-sm font-semibold text-gray-600"
                            >
                                Lisans Adı
                            </label>
                            <input
                                type="text"
                                value={props.trainerLicence.name} onChange={e => props.setUserLicence({ ...props.trainerLicence, name: e.target.value })}
                                className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2 w-full">
                            <label
                                form="licenceName"
                                className="block text-sm font-semibold text-gray-600"
                            >
                                Açıklama
                            </label>
                            <textarea
                                value={props.trainerLicence.description} onChange={e => props.setUserLicence({ ...props.trainerLicence, description: e.target.value })}
                                className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md 
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                        <div className="mb-2 w-full">
                            <label
                                form="licenceDate"
                                className="block text-sm font-semibold text-gray-600"
                            >
                                Lisans Alma Tarihi
                            </label>
                            <input
                                type="date"
                                value={props.trainerLicence.licenceDate} onChange={e => { props.setUserLicence({ ...props.trainerLicence, licenceDate: e.target.value }) }}
                                className="block w-[30rem] px-2 py-2 mt-2 text-blue-700 bg-white border rounded-md cursor-pointer
                            focus:border-blue-400 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                            />
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={props.cancelLicenceDialog}>İptal</Button>
                        <Button onClick={props.closeLicenceDialog}>Ekle</Button>
                    </DialogActions>
                </Dialog>
                <DataTable
                    columns={props.columns}
                    data={props.trainerProps.trainerLicences}
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

export default TrainerLicences