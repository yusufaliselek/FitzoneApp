import { DataGrid, GridColDef, GridRenderCellParams, GridValueGetterParams } from '@mui/x-data-grid';
import React from 'react';
import { RiAccountCircleLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';

import AddContentHeader from '../../components/Header/AddContentHeader';
import Nav from '../../components/Nav/Nav';

const columns: GridColDef[] = [
    {
        field: 'photo',
        headerName: '',
        sortable: false,
        filterable: false,
        hideable: false,
        groupable: false,
        renderCell: (params: GridRenderCellParams<any>) => (
            <img src={params.value} alt={params.row.firstname} className="rounded-full bg-cover bg-center"/>
        ),
    },
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
    { id: 1, photo: "https://source.unsplash.com/500x500/?portrait?1", lastName: 'Snow', firstName: 'Jon', age: 35, weight: 120, height: 180, memberType: 'Premium', renewalDate: "22/10/2023" },
    { id: 2, photo: "https://source.unsplash.com/500x500/?portrait?2", lastName: 'Lannister', firstName: 'Cersei', age: 42, weight: 120, height: 180, memberType: 'Basic', renewalDate: "22/10/2023" },
    { id: 3, photo: "https://source.unsplash.com/500x500/?portrait?3", lastName: 'Lannister', firstName: 'Jaime', age: 45, weight: 120, height: 180, memberType: 'Premium', renewalDate: "22/10/2023" },
    { id: 4, photo: "https://source.unsplash.com/500x500/?portrait?4", lastName: 'Stark', firstName: 'Arya', age: 16, weight: 120, height: 180, memberType: 'Basic', renewalDate: "22/10/2023" },
    { id: 5, photo: "https://source.unsplash.com/500x500/?portrait?5", lastName: 'Targaryen', firstName: 'Daenerys', age: 132, weight: 120, height: 180, memberType: 'Premium', renewalDate: "22/10/2023" },
    { id: 6, photo: "https://source.unsplash.com/500x500/?portrait?6", lastName: 'Melisandre', firstName: null, age: 150, weight: 120, height: 180, memberType: 'Basic', renewalDate: "22/10/2023" },
    { id: 7, photo: "https://source.unsplash.com/500x500/?portrait?7", lastName: 'Clifford', firstName: 'Ferrara', age: 44, weight: 120, height: 180, memberType: 'Premium', renewalDate: "22/10/2023" },
    { id: 8, photo: "https://source.unsplash.com/500x500/?portrait?8", lastName: 'Frances', firstName: 'Rossini', age: 36, weight: 120, height: 180, memberType: 'Basic', renewalDate: "22/10/2023" },
    { id: 9, photo: "https://source.unsplash.com/500x500/?portrait?9", lastName: 'Roxie', firstName: 'Harvey', age: 65, weight: 120, height: 180, memberType: 'Premium', renewalDate: "22/10/2023" },
];

const Members = () => {
    const navigate = useNavigate()
    // useEffect(() => {
    //     setTimeout(() => {
    //         setLoading(true);
    //     }, 1500)
    // })

    function simple() {
        navigate("/members/add");
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
                        rowHeight={100}
                        hideFooterSelectedRowCount
                    />
                </div>
            </div>
        </div>
    )
}

export default Members