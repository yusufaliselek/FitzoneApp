import React, { useState, useEffect } from 'react'
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Nav from '../components/Nav/Nav';
import Spinner from '../components/Spinner/Spinner';

const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    {
        field: 'age',
        headerName: 'Age',
        type: 'number',
        width: 90,
    },
    {
        field: 'fullName',
        headerName: 'Full name',
        description: 'This column has a value getter and is not sortable.',
        sortable: false,
        width: 160,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
    },
];
const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 6, lastName: 'Melisandre', firstName: "Artics", age: 150 },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
    { id: 12, lastName: 'Snow', firstName: 'Jon', age: 35 },
    { id: 123, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
    { id: 123132, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
    { id: 123, lastName: 'Stark', firstName: 'Arya', age: 16 },
    { id: 55, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
    { id: 65, lastName: 'Melisandre', firstName: "Artics", age: 150 },
    { id: 75, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
    { id: 68, lastName: 'Frances', firstName: 'Rossini', age: 36 },
    { id: 69, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

const Users = () => {
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        }, 1500)
    })
    return (
        <div className='flex w-screen h-screen'>
            <Nav pageName='Kullanıcılar'/>
            <div style={{ height: '100%', width: '100%' }}>
                <DataGrid
                    rows={rows}
                    columns={columns}
                    checkboxSelection
                />
            </div>
        </div>
    )
}

export default Users