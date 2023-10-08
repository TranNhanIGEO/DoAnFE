import { Fragment, useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MaterialReactTable } from 'material-react-table';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, Stack, Tooltip } from '@mui/material';
import { Edit } from '@mui/icons-material';
import useAxiosJWT from "src/hooks/useAxiosJWT";
import { createStatistic, showStatistic, updateStatistic } from 'src/redux/request/statisticRequest';
import { getStatistic } from 'src/redux/reducer/statisticSlice';

export const layers = [
    { value: 'chitieu_truongthuong', text: 'Lớp thường' },
    { value: 'chitieu_truongchuyen', text: 'Lớp chuyên' },
    { value: 'chitieu_truongcoloptichhop', text: 'Lớp tích hợp' }
]

const StatisticTable = () => {
    const [modalOpen, setModalOpen] = useState(false)
    const listStatistic = useSelector(getStatistic)
    const dispatch = useDispatch()
    const axiosJWT = useAxiosJWT()
    const [selectedLayer, setSelectedLayer] = useState(layers[0].value);
    const [defaultYear, setDefaultYear] = useState()
    const [currentYear] = useState(new Date().getFullYear())
    const [selectedYear, setSelectedYear] = useState(currentYear);

    useEffect(() => {
        showStatistic(selectedLayer, selectedYear, axiosJWT, dispatch)
    }, [selectedLayer, selectedYear, dispatch])

    useEffect(() => {
        const getYear = listStatistic && listStatistic[0]?.namht
        setDefaultYear(getYear)
    }, [listStatistic])

    const years = useMemo(() => [
        { value: `${defaultYear}`, text: `${defaultYear}` },
        { value: `${defaultYear - 1}`, text: `${defaultYear - 1}` },
        { value: `${defaultYear - 2}`, text: `${defaultYear - 2}` }
    ], [defaultYear])

    const handleSelectLayer = (e) => {
        setSelectedLayer(e.target.value)
    }

    const handleSelectedYear = (e) => {
        setSelectedYear(e.target.value)
    }

    const columns = useMemo(() => {
        let showYears = ""
        let criteriaColumn = "ctieu_ht"
        let registrationColumn = "slnv1_ht"
        if (selectedYear === `${defaultYear}`) {
            showYears = defaultYear
            criteriaColumn = "ctieu_ht"
            registrationColumn = "slnv1_ht"
        }
        else if (selectedYear === `${defaultYear - 1}`) {
            showYears = defaultYear - 1
            criteriaColumn = "ctieu_1n"
            registrationColumn = "slnv1_1n"
        }
        else if (selectedYear === `${defaultYear - 2}`) {
            showYears = defaultYear - 2
            criteriaColumn = "ctieu_2n"
            registrationColumn = "slnv1_2n"
        } 
        return [
            { accessorKey: 'number', header: 'STT', size: 100, enableEditing: false },
            { accessorKey: 'matruong', header: 'Mã trường', size: 100, enableEditing: false },
            { accessorKey: 'tentruong', header: 'Tên trường', enableEditing: false  },
            { accessorKey: `${criteriaColumn}`, header: `Chỉ tiêu ${showYears}` },
            { accessorKey: `${registrationColumn}`, header: `Số lượng NV1 ${showYears}` }
        ]
    }, [selectedYear, defaultYear])

    const rows = useMemo(() => (
        listStatistic?.map((statistic, index) => {
            let statisticData = {}
            if (statistic.ctieu_ht && statistic.slnv1_ht) {
                statisticData = {
                    ctieu_ht: statistic.ctieu_ht,
                    slnv1_ht: statistic.slnv1_ht
                }
            } else if (statistic.ctieu_1n && statistic.slnv1_1n) {
                statisticData = {
                    ctieu_1n: statistic.ctieu_1n,
                    slnv1_1n: statistic.slnv1_1n
                }
            } else if (statistic.ctieu_2n && statistic.slnv1_2n) {
                statisticData = {
                    ctieu_2n: statistic.ctieu_2n,
                    slnv1_2n: statistic.slnv1_2n
                }
            }
            return {
                number: index + 1,
                matruong: statistic.matruong,
                tentruong: statistic.tentruong,
                ...statisticData
            }
        })
    ), [listStatistic])
    
    const handleCreateData = () => {
        const newData = {
            layer: selectedLayer,
            year: currentYear
        }
        createStatistic(newData, axiosJWT, dispatch)
        showStatistic(selectedLayer, currentYear, axiosJWT, dispatch)
    };

    const handleUpdateData = ({ exitEditingMode, values }) => {
        let target = ""
        let registration = ""
        if (selectedYear === defaultYear) {
            target = values.ctieu_ht
            registration = values.slnv1_ht
        } 
        else if (selectedYear === defaultYear - 1) {
            target = values.ctieu_1n
            registration = values.slnv1_1n
        } 
        else if (selectedYear === defaultYear - 2) {
            target = values.ctieu_2n
            registration = values.slnv1_2n
        }
        const editData = {
            layer: selectedLayer,
            year: selectedYear,
            target: target,
            registration: registration
        }
        updateStatistic(values.matruong, editData, axiosJWT, dispatch)
        exitEditingMode()
    }

    return (
        listStatistic && years && defaultYear && 
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
                        <Button
                            variant='contained'
                            color='secondary'
                            disabled={currentYear === defaultYear}
                            onClick={() => setModalOpen(true)}>
                            Create Statistic {currentYear}
                        </Button>
                        <select value={selectedLayer} onChange={handleSelectLayer}>
                            {layers.map((layer, index) => (
                                <option key={index} value={layer.value}>
                                    {layer.text}
                                </option>
                            ))}
                        </select>
                        <select value={selectedYear} onChange={handleSelectedYear}>
                            {years.map((year, index) => (
                                <option key={index} value={year.value}>
                                    {year.text}
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
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onSubmit={handleCreateData}>
            </OpenModal>
        </Fragment>
    );
}
export const OpenModal = ({ open, onClose, onSubmit }) => {
    const [currentYear] = useState(new Date().getFullYear())

    const handleSubmit = () => {
        onSubmit()
        onClose()
    };
    
    return (
        <Dialog open={open}>
            <DialogTitle textAlign="center">Create New Statistic</DialogTitle>
            <DialogContent>
                <form onSubmit={(e) => e.preventDefault()}>
                    <Stack sx={{ width: '100%', minWidth: { xs: '300px', sm: '360px', md: '400px' }, gap: '1.5rem' }}>
                        Xác nhận tạo dữ liệu thống kê cho năm {currentYear}
                    </Stack>
                </form>
            </DialogContent>
            <DialogActions sx={{ p: '1.25rem' }}>
                <Button onClick={onClose}>Cancel</Button>
                <Button color="secondary" onClick={handleSubmit} variant="contained">Create New Statistic</Button>
            </DialogActions>
        </Dialog>
    );
};

export default StatisticTable;