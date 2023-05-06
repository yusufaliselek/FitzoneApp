import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box } from '@mui/material';
import { DataGrid, GridCallbackDetails, GridColDef, GridEventListener, GridSelectionModel } from '@mui/x-data-grid';


export default function MUIDataGrid({ rows, columns, onCellEditCommit, onSelectionModelChange }: { rows: any[], columns: GridColDef[], onCellEditCommit: GridEventListener<"cellEditCommit">, 
onSelectionModelChange: ((selectionModel: GridSelectionModel, details: GridCallbackDetails<any>) => void) }) {
    return (
        <Box sx={{ height: 400, width: '100%' }}>
            <DataGrid
                rows={rows}
                columns={columns}
                disableColumnFilter
                hideFooterSelectedRowCount
                onCellEditCommit={onCellEditCommit}
                checkboxSelection
                onSelectionModelChange={onSelectionModelChange}
            />
        </Box>
    );
}