import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, TextField, Tooltip } from '@mui/material';
import { Edit } from '@mui/icons-material';
import useAxiosJWT from "src/hooks/useAxiosJWT";
import { showAllData, deleteData, createData, updateData } from 'src/redux/request/schoolRequest';
import { getAllSchool } from 'src/redux/reducer/schoolSlice';

export const layers = [
    { id: '1', value: 'truongthuong', text: 'THPT thường' },
    { id: '2', value: 'truongcoloptichhop', text: 'THPT có lớp tích hợp' },
    { id: '3', value: 'truongchuyen', text: 'THPT chuyên' }
];

const SchoolTable = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const listData = useSelector(getAllSchool)
    const dispatch = useDispatch()
    const axiosJWT = useAxiosJWT()
    const [selectedLayer, setSelectedLayer] = useState(layers[0].value);

    useEffect(() => {
        showAllData(selectedLayer, axiosJWT, dispatch)
    }, [selectedLayer, dispatch])

    const handleSelectLayer = (e) => {
        setSelectedLayer(e.target.value)
    }

    const columns = useMemo(() => [
        { accessorKey: 'number', header: 'STT', size: 100, enableEditing: false },
        { accessorKey: 'matruong', header: 'Mã trường', size: 100, enableEditing: false },
        { accessorKey: 'tentruong', header: 'Tên trường' },
        { accessorKey: 'diachi', header: 'Địa chỉ' },
        { accessorKey: 'trangweb', header: 'Trang web' }
    ], []);

    const rows = useMemo(() => {
        return listData?.map((user, index) => ({
                number: index + 1,
                matruong: user.matruong,
                tentruong: user.tentruong,
                diachi: user.diachi,
                trangweb: user.trangweb
            })
        )
    }, [listData])
        
    const handleCreateData = (values) => {
        const newData = {
            layer: selectedLayer,
            id: values.matruong,
            name: values.tentruong,
            address: values.diachi,
            web: values.trangweb,
            long: values.long,
            lat: values.lat
        }
        createData(newData, axiosJWT, dispatch)
    };

    const handleUpdateData = ({ exitEditingMode, values }) => {
        const editData = {
            layer: selectedLayer,
            name: values.tentruong,
            address: values.diachi,
            web: values.trangweb
        }
        updateData(values.matruong, editData, axiosJWT, dispatch)
        exitEditingMode()
    }
    
    const handleDeleteData = (rows) => {
        rows.map((row) => {
            const id = row.original.matruong
            return deleteData(selectedLayer, id, axiosJWT, dispatch)
        })
    }

    return (
        listData && <Fragment>
            <MaterialReactTable
                columns={columns}
                data={rows}
                editingMode='modal'
                enableColumnOrdering
                enableColumnResizing
                enableColumnActions={false}
                enableEditing
                enableRowActions
                enableRowSelection
                onEditingRowSave={handleUpdateData}
                positionActionsColumn='first'
                positionToolbarAlertBanner='bottom'
                localization={{actions: 'Chỉnh sửa'}}
                renderTopToolbarCustomActions={({ table }) => (
                    <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={() => setModalOpen(true)}>
                            Create School
                        </Button>
                        <Button
                            variant="contained"
                            color="error"
                            disabled={!table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected()}
                            onClick={() => handleDeleteData(table.getSelectedRowModel().rows)}>
                            Delete School
                        </Button>
                        <select value={selectedLayer} onChange={handleSelectLayer}>
                            {layers.map(layer => (
                                <option key={layer.id} value={layer.value}>
                                    {layer.text}
                                </option>
                            ))}
                        </select>
                    </Box>
                )}
                renderRowActions={({ row, table }) => (
                    <Box sx={{ display: 'flex', gap: '1rem' }}>
                        <Tooltip arrow placement="right" title="Edit">
                            <IconButton onClick={() => table.setEditingRow(row)}>
                                <Edit />
                            </IconButton>
                        </Tooltip>
                    </Box>
                )}
            >
            </MaterialReactTable>
            <OpenModal
                columns={columns}
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleCreateData}>
            </OpenModal>
        </Fragment>
    );
}
export const OpenModal = ({ open, columns, onClose, onSubmit }) => {
    const [values, setValues] = useState(() =>
        columns.reduce((acc, column) => {
            acc[column.accessorKey ?? ''] = '';
            return acc;
        }, {}),
    );

    const handleSubmit = () => {
        onSubmit(values);
        onClose();
    };
    const columnsCreate = useMemo(() => [
        { accessorKey: 'matruong', header: 'Mã trường' },
        { accessorKey: 'tentruong', header: 'Tên trường' },
        { accessorKey: 'diachi', header: 'Địa chỉ' },
        { accessorKey: 'trangweb', header: 'Trang web' },
        { accessorKey: 'long', header: 'Kinh độ' },
        { accessorKey: 'lat', header: 'Vĩ độ' }
    ], []);
    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Create New School</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack sx={{ width: '100%', minWidth: { xs: '300px', sm: '360px', md: '400px' }, gap: '1.5rem' }}>
                        {columnsCreate.map((column) => (
                            <TextField
                                key={column.accessorKey}
                                label={column.header}
                                name={column.accessorKey}
                                onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}>
                            </TextField>
                        ))}
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">Create New School</Button>
            </DialogActions>
        </Dialog>
    );
};

export default SchoolTable;