import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react';
import { RiAccountCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import AddContentHeader from '../../components/Header/AddContentHeader';
import Nav from '../../components/Nav/Nav';

const columns: GridColDef[] = [
    {
        field: 'fullName',
        headerName: 'Ad Soyad',
        // description: 'A',
        width: 300,
        valueGetter: (params: GridValueGetterParams) =>
            `${params.row.firstName || ''} ${params.row.lastName || ''}`,
        resizable: true,
        hideable: false,
    },
    {
        field: 'age',
        headerName: 'Yaş',
        type: 'number',
        width: 150,
    },
    {
        field: 'weight',
        headerName: 'Kilo (kg)',
        type: 'number',
        width: 150,
    },
    {
        field: 'height',
        headerName: 'Boy (cm)',
        type: 'number',
        width: 150,
    },
    {
        field: 'memberType',
        headerName: 'Üyelik',
        width: 150,
    },
    {
        field: 'renewalDate',
        headerName: 'Üyelik Bitiş Tarihi',
        type: 'Date',
        width: 200,
    },
    // {
    //     field: 'id',
    //     headerName: 'Aksiyonlar',
    //     renderCell: (params: GridRenderCellParams<Date>) => (
    //       <strong>
    //         <button>
    //           Open
    //         </button>
    //       </strong>
    //     ),
    //     width: 200,
    //   },
];
const rows = [
    { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35, weight: 120, height: 180, memberType: 'Premium', renewalDate: "22/10/2023" },
    { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42, weight: 120, height: 180, memberType: 'Basic', renewalDate: "22/10/2023" },
    { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45, weight: 120, height: 180, memberType: 'Premium', renewalDate: "22/10/2023" },
    { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16, weight: 120, height: 180, memberType: 'Basic', renewalDate: "22/10/2023" },
    { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 132, weight: 120, height: 180, memberType: 'Premium', renewalDate: "22/10/2023" },
    { id: 6, lastName: 'Melisandre', firstName: null, age: 150, weight: 120, height: 180, memberType: 'Basic', renewalDate: "22/10/2023" },
    { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44, weight: 120, height: 180, memberType: 'Premium', renewalDate: "22/10/2023" },
    { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36, weight: 120, height: 180, memberType: 'Basic', renewalDate: "22/10/2023" },
    { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65, weight: 120, height: 180, memberType: 'Premium', renewalDate: "22/10/2023" },
];

const Members = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()
    useEffect(() => {
        setTimeout(() => {
            setLoading(true);
        }, 1500)
    })

    function simple() {
        navigate("/members/addmember");
    }

    return (
        <div className='flex w-screen h-screen'>
            {/* Navbar */}
            <Nav pageName='Üyeler' />
            <div className='flex flex-col w-full h-screen'>
                {/* Header */}
                <AddContentHeader pageName='Üyeler' addContent='Üye ekle' addContentIcon={<RiAccountCircleLine className='h-8 w-8' />} addContentAction={simple} />
                {/* Content */}
                <div className='flex items-center p-5 grow'>
                    <DataGrid
                        rows={rows}
                        columns={columns}
                        rowsPerPageOptions={[15]}
                        onCellDoubleClick={(e) => { alert(e.id) }}
                    />
                </div>
            </div>
        </div>
    )
}

export default Members