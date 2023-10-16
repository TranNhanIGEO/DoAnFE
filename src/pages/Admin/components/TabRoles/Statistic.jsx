import { Fragment, useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialReactTable } from "material-react-table";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Tooltip,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import useAxiosJWT from "src/hooks/useAxiosJWT";
import {
  createStatistic,
  showStatistic,
  updateStatistic,
} from "src/redux/request/statisticRequest";
import { getStatistic } from "src/redux/reducer/statisticSlice";

export const layers = [
  { value: "chitieu_lopthuong", text: "Lớp thường" },
  { value: "chitieu_lopchuyen", text: "Lớp chuyên" },
  { value: "chitieu_loptichhop", text: "Lớp tích hợp" },
];

const StatisticTable = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const listStatistic = useSelector(getStatistic);
  const dispatch = useDispatch();
  const axiosJWT = useAxiosJWT();
  const [selectedLayer, setSelectedLayer] = useState(layers[0].value);
  const [defaultYear, setDefaultYear] = useState();
  const [currentYear] = useState(new Date().getFullYear());

  useEffect(() => {
    showStatistic(selectedLayer, axiosJWT, dispatch);
  }, [selectedLayer, axiosJWT, dispatch]);

  useEffect(() => {
    const getYear = listStatistic && listStatistic[0]?.namcapnhat;
    setDefaultYear(getYear);
  }, [listStatistic]);

  const handleSelectLayer = (e) => {
    setSelectedLayer(e.target.value);
  };

  const columns = useMemo(() => {
    const getYear = listStatistic && listStatistic[0]?.namcapnhat;
    return [
      {
        accessorKey: "matruong",
        header: "Mã trường",
        size: 100,
        enableEditing: false,
      },
      { accessorKey: "tentruong", header: "Tên trường", enableEditing: false },
      { accessorKey: "ctieu_2n", header: `Chỉ tiêu ${getYear - 2}` },
      { accessorKey: "slnv1_2n", header: `Số lượng NV1 ${getYear - 2}` },
      { accessorKey: "ctieu_1n", header: `Chỉ tiêu ${getYear - 1}` },
      { accessorKey: "slnv1_1n", header: `Số lượng NV1 ${getYear - 1}` },
      { accessorKey: "ctieu_ht", header: `Chỉ tiêu ${getYear}` },
      { accessorKey: "slnv1_ht", header: `Số lượng NV1 ${getYear}` },
    ];
  }, [listStatistic]);

  const rows = useMemo(
    () =>
      listStatistic?.map((statistic) => {
        return {
          matruong: statistic.matruong ?? "",
          tentruong: statistic.tentruong ?? "",
          ctieu_2n: statistic.ctieu_2n ?? "",
          slnv1_2n: statistic.slnv1_2n ?? "",
          ctieu_1n: statistic.ctieu_1n ?? "",
          slnv1_1n: statistic.slnv1_1n ?? "",
          ctieu_ht: statistic.ctieu_ht ?? "",
          slnv1_ht: statistic.slnv1_ht ?? "",
        };
      }),
    [listStatistic]
  );

  const handleCreateData = () => {
    const newData = {
      layer: selectedLayer,
      year: currentYear,
    };
    createStatistic(newData, axiosJWT, dispatch);
    showStatistic(selectedLayer, axiosJWT, dispatch);
  };

  const handleUpdateData = ({ exitEditingMode, values }) => {
    const id = values.matruong;
    const editData = {
      layer: selectedLayer,
      year: currentYear,
      ctieu_2n: Number(values.ctieu_2n),
      slnv1_2n: Number(values.slnv1_2n),
      ctieu_1n: Number(values.ctieu_1n),
      slnv1_1n: Number(values.slnv1_1n),
      ctieu_ht: Number(values.ctieu_ht),
      slnv1_ht: Number(values.slnv1_ht),
    };
    updateStatistic(id, editData, axiosJWT, dispatch);
    exitEditingMode();
  };

  return (
    listStatistic &&
    defaultYear && (
      <Fragment>
        <MaterialReactTable
          columns={columns}
          data={rows}
          initialState={{ columnVisibility: { matruong: false } }}
          editingMode="modal"
          enableColumnOrdering
          enableColumnResizing
          enableColumnActions={false}
          enableEditing
          enableRowActions
          onEditingRowSave={handleUpdateData}
          positionActionsColumn="first"
          positionToolbarAlertBanner="bottom"
          localization={{ actions: "Chỉnh sửa" }}
          renderTopToolbarCustomActions={() => (
            <Box sx={{ display: "flex", gap: "1rem", p: "4px" }}>
              <Button
                variant="contained"
                color="secondary"
                disabled={currentYear === defaultYear}
                onClick={() => setModalOpen(true)}
              >
                Create Statistic {currentYear}
              </Button>
              <select value={selectedLayer} onChange={handleSelectLayer}>
                {layers.map((layer, index) => (
                  <option key={index} value={layer.value}>
                    {layer.text}
                  </option>
                ))}
              </select>
            </Box>
          )}
          renderRowActions={({ row, table }) => (
            <Box sx={{ display: "flex", gap: "1rem" }}>
              <Tooltip arrow placement="right" title="Edit">
                <IconButton onClick={() => table.setEditingRow(row)}>
                  <Edit />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        ></MaterialReactTable>
        <OpenModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          onSubmit={handleCreateData}
        ></OpenModal>
      </Fragment>
    )
  );
};
export const OpenModal = ({ open, onClose, onSubmit }) => {
  const [currentYear] = useState(new Date().getFullYear());

  const handleSubmit = () => {
    onSubmit();
    onClose();
  };

  return (
    <Dialog open={open}>
      <DialogTitle textAlign="center">Create New Statistic</DialogTitle>
      <DialogContent>
        <form onSubmit={(e) => e.preventDefault()}>
          <Stack
            sx={{
              width: "100%",
              minWidth: { xs: "300px", sm: "360px", md: "400px" },
              gap: "1.5rem",
            }}
          >
            Xác nhận tạo dữ liệu thống kê cho năm {currentYear}
          </Stack>
        </form>
      </DialogContent>
      <DialogActions sx={{ p: "1.25rem" }}>
        <Button onClick={onClose}>Cancel</Button>
        <Button color="secondary" onClick={handleSubmit} variant="contained">
          Create New Statistic
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default StatisticTable;
