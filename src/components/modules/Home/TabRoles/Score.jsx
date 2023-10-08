import { Fragment, useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialReactTable } from 'material-react-table';
import { Box, IconButton, Tooltip } from '@mui/material';
import { Edit } from '@mui/icons-material';
import useAxiosJWT from "src/hooks/useAxiosJWT";
import { showScore, updateScore } from 'src/redux/request/scoreRequest';
import { getScore } from 'src/redux/reducer/scoreSlice';

export const layers = [
    { id: '1', value: 'diemchuan_truongthuong_lopthuong', text: 'THPT thường' },
    { id: '2', value: 'diemchuan_truongco_loptichhop', text: 'THPT có lớp tích hợp' },
    { id: '3', value: 'diemchuan_truongchuyen_lopthuong', text: 'THPT chuyên - Lớp thường' },
    { id: '4', value: 'diemchuan_truongchuyen_lopchuyen_toan', text: 'THPT chuyên - Lớp chuyên Toán' },
    { id: '5', value: 'diemchuan_truongchuyen_lopchuyen_van', text: 'THPT chuyên - Lớp chuyên Văn' },
    { id: '6', value: 'diemchuan_truongchuyen_lopchuyen_anh', text: 'THPT chuyên - Lớp chuyên Anh' },
    { id: '7', value: 'diemchuan_truongchuyen_lopchuyen_hoa', text: 'THPT chuyên - Lớp chuyên Hóa' },
    { id: '8', value: 'diemchuan_truongchuyen_lopchuyen_ly', text: 'THPT chuyên - Lớp chuyên Lý' },
    { id: '9', value: 'diemchuan_truongchuyen_lopchuyen_sinh', text: 'THPT chuyên - Lớp chuyên Sinh' },
    { id: '10', value: 'diemchuan_truongchuyen_lopchuyen_su', text: 'THPT chuyên - Lớp chuyên Sử' },
    { id: '11', value: 'diemchuan_truongchuyen_lopchuyen_dia', text: 'THPT chuyên - Lớp chuyên Địa' },
    { id: '12', value: 'diemchuan_truongchuyen_lopchuyen_tin', text: 'THPT chuyên - Lớp chuyên Tin' },
    { id: '13', value: 'diemchuan_truongchuyen_lopchuyen_phap', text: 'THPT chuyên - Lớp chuyên Tiếng Pháp' },
    { id: '14', value: 'diemchuan_truongchuyen_lopchuyen_nhat', text: 'THPT chuyên - Lớp chuyên Tiếng Nhật' },
    { id: '15', value: 'diemchuan_truongchuyen_lopchuyen_trung', text: 'THPT chuyên - Lớp chuyên Tiếng Trung' }
];

const ScoreTable = () => {
    const listData = useSelector(getScore)
    const dispatch = useDispatch()
    const axiosJWT = useAxiosJWT()
    const [selectedLayer, setSelectedLayer] = useState(layers[0].value);

    useEffect(() => {
        showScore(selectedLayer, axiosJWT, dispatch)
    }, [selectedLayer, dispatch])

    const handleSelectLayer = (e) => {
        setSelectedLayer(e.target.value)
    }

    const columns = useMemo(() => {
        let scoreColumn = ""
        if (selectedLayer === 'diemchuan_truongthuong_lopthuong') {
            scoreColumn = [
                { accessorKey: 'nv1', header: 'Điểm NV 1' },
                { accessorKey: 'nv2', header: 'Điểm NV 2' },
                { accessorKey: 'nv3', header: 'Điểm NV 3' },
            ]
        } 
        else if (selectedLayer === 'diemchuan_truongchuyen_lopthuong') {
            scoreColumn = [
                { accessorKey: 'nv3', header: 'Điểm NV 3' },
                { accessorKey: 'nv4', header: 'Điểm NV 4' }
            ]
        } 
        else {
            scoreColumn = [
                { accessorKey: 'nv1', header: 'Điểm NV 1' },
                { accessorKey: 'nv2', header: 'Điểm NV 2' },
            ]
        }
        return [
            { accessorKey: 'number', header: 'STT', size: 100, enableEditing: false },
            { accessorKey: 'matruong', header: 'Mã trường', size: 120, enableEditing: false },
            { accessorKey: 'name', header: 'Tên trường', size: 300, enableEditing: false  },
            { accessorKey: 'chitieu', header: 'Chỉ tiêu' },
            ...scoreColumn
        ]
    }, [selectedLayer])

    const rows = useMemo(() => (
        listData?.map((data, index) => {
            if (data.nv1 && data.nv2 && data.nv3) {
                return ({
                    number: index + 1,
                    matruong: data.matruong,
                    name: data.tentruong,
                    chitieu: data.chitieu,
                    nv1: data.nv1,
                    nv2: data.nv2,
                    nv3: data.nv3
                })
            } else if (data.nv3 && data.nv4) {
                return ({
                    number: index + 1,
                    matruong: data.matruong,
                    name: data.tentruong,
                    chitieu: data.chitieu,
                    nv3: data.nv3,
                    nv4: data.nv4
                })
            } else {
                return ({
                    number: index + 1,
                    matruong: data.matruong,
                    name: data.tentruong,
                    chitieu: data.chitieu,
                    nv1: data.nv1,
                    nv2: data.nv2
                })
            }
        }) 
    ), [listData])

    const handleUpdateData = ({ exitEditingMode, values }) => {
        let editScore = {}
        if (selectedLayer === 'diemchuan_truongthuong_lopthuong') {
            editScore = {
                layer: selectedLayer,
                chitieu: values.chitieu,
                nv1: values.nv1,
                nv2: values.nv2,
                nv3: values.nv3
            }
        } else if (selectedLayer === 'diemchuan_truongchuyen_lopthuong') {
            editScore = {
                layer: selectedLayer,
                chitieu: values.chitieu,
                nv3: values.nv3,
                nv4: values.nv4
            }
        } else {
            editScore = {
                layer: selectedLayer,
                chitieu: values.chitieu,
                nv1: values.nv1,
                nv2: values.nv2,
            }
        }
        updateScore(values.matruong, editScore, axiosJWT, dispatch)
        exitEditingMode()
    }

    return (
        listData && 
        <Fragment>
            <MaterialReactTable
                columns={columns}
                data={rows}
                editingMode='modal'
                enableColumnOrdering
                enableColumnResizing
                enableColumnActions={false}
                enableEditing
                enableRowActions
                onEditingRowSave={handleUpdateData}
                positionActionsColumn='first'
                positionToolbarAlertBanner='bottom'
                localization={{actions: 'Chỉnh sửa'}}
                renderTopToolbarCustomActions={() => (
                    <Box sx={{ display: 'flex', gap: '1rem', p: '4px' }}>
                        <select className='select-layer' value={selectedLayer} onChange={handleSelectLayer}>
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
        </Fragment>
    );
}

export default ScoreTable;