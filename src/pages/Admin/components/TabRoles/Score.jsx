import { Fragment, useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MaterialReactTable } from "material-react-table";
import { Box, IconButton, Tooltip } from "@mui/material";
import { Edit } from "@mui/icons-material";
import useAxiosJWT from "src/hooks/useAxiosJWT";
import { showScore, updateScore } from "src/redux/request/scoreRequest";
import { getScore } from "src/redux/reducer/scoreSlice";

const schoolTypes = [
  { id: "00LTKC00", name: "Lớp không chuyên (trường thường)" },
  { id: "00LTHC00", name: "Lớp tích hợp" },
  { id: "00LCTT00", name: "Lớp chuyên toán" },
  { id: "00LCVH00", name: "Lớp chuyên văn" },
  { id: "00LCHH00", name: "Lớp chuyên hóa" },
  { id: "00LCVL00", name: "Lớp chuyên lý" },
  { id: "00LCSH00", name: "Lớp chuyên sinh" },
  { id: "00LCLS00", name: "Lớp chuyên sử" },
  { id: "00LCĐL00", name: "Lớp chuyên địa" },
  { id: "00LCTH00", name: "Lớp chuyên tin" },
  { id: "00LCJP00", name: "Lớp chuyên tiếng Nhật" },
  { id: "00LCFR00", name: "Lớp chuyên tiếng Pháp" },
  { id: "00LCEN00", name: "Lớp chuyên tiếng Anh" },
  { id: "00LCCN00", name: "Lớp chuyên tiếng Trung" },
];

const ScoreTable = () => {
  const listData = useSelector(getScore);
  const dispatch = useDispatch();
  const axiosJWT = useAxiosJWT();
  const [selectedLayer, setSelectedLayer] = useState(schoolTypes[0].id);

  useEffect(() => {
    showScore(selectedLayer, axiosJWT, dispatch);
  }, [selectedLayer, axiosJWT, dispatch]);

  const handleSelectLayer = (e) => {
    setSelectedLayer(e.target.value);
  };

  const columns = useMemo(() => {
    let scoreColumn = "";
    const getYear = listData && listData[0]?.namcapnhat;
    if (selectedLayer === "00LTKC00") {
      scoreColumn = [
        { accessorKey: "nv1_2n", header: `NV 1 - ${getYear - 2}`, size: 160 },
        { accessorKey: "nv2_2n", header: `NV 2 - ${getYear - 2}`, size: 160 },
        { accessorKey: "nv3_2n", header: `NV 3 - ${getYear - 2}`, size: 160 },
        { accessorKey: "nv1_1n", header: `NV 1 - ${getYear - 1}`, size: 160 },
        { accessorKey: "nv2_1n", header: `NV 2 - ${getYear - 1}`, size: 160 },
        { accessorKey: "nv3_1n", header: `NV 3 - ${getYear - 1}`, size: 160 },
        { accessorKey: "nv1_ht", header: `NV 1 - ${getYear}`, size: 160 },
        { accessorKey: "nv2_ht", header: `NV 2 - ${getYear}`, size: 160 },
        { accessorKey: "nv3_ht", header: `NV 3 - ${getYear}`, size: 160 },
      ];
    } else {
      scoreColumn = [
        { accessorKey: "nv1_2n", header: `NV 1 - ${getYear - 2}`, size: 160 },
        { accessorKey: "nv2_2n", header: `NV 2 - ${getYear - 2}`, size: 160 },
        { accessorKey: "nv1_1n", header: `NV 1 - ${getYear - 1}`, size: 160 },
        { accessorKey: "nv2_1n", header: `NV 2 - ${getYear - 1}`, size: 160 },
        { accessorKey: "nv1_ht", header: `NV 1 - ${getYear}`, size: 160 },
        { accessorKey: "nv2_ht", header: `NV 2 - ${getYear}`, size: 160 },
      ];
    }
    return [
      {
        accessorKey: "matruong",
        header: "Mã trường",
        size: 100,
        enableEditing: false,
      },
      {
        accessorKey: "tentruong",
        header: "Tên trường",
        size: 180,
        enableEditing: false,
      },
      ...scoreColumn,
    ];
  }, [selectedLayer, listData]);

  const rows = useMemo(
    () =>
      listData?.map((data) => {
        if (selectedLayer === "00LTKC00") {
          return {
            matruong: data.matruong,
            tentruong: data.tentruong,
            nv1_2n: data.nv1_2n ?? "",
            nv2_2n: data.nv2_2n ?? "",
            nv3_2n: data.nv3_2n ?? "",
            nv1_1n: data.nv1_1n ?? "",
            nv2_1n: data.nv2_1n ?? "",
            nv3_1n: data.nv3_1n ?? "",
            nv1_ht: data.nv1_ht ?? "",
            nv2_ht: data.nv2_ht ?? "",
            nv3_ht: data.nv3_ht ?? "",
          };
        } else {
          return {
            matruong: data.matruong,
            tentruong: data.tentruong,
            nv1_2n: data.nv1_2n ?? "",
            nv2_2n: data.nv2_2n ?? "",
            nv1_1n: data.nv1_1n ?? "",
            nv2_1n: data.nv2_1n ?? "",
            nv1_ht: data.nv1_ht ?? "",
            nv2_ht: data.nv2_ht ?? "",
          };
        }
      }),
    [selectedLayer, listData]
  );

  const handleUpdateData = ({ exitEditingMode, values }) => {
    const id = values.matruong;
    let editScore = {};
    if (selectedLayer === "00LTKC00") {
      editScore = {
        layer: selectedLayer,
        nv1_2n: Number(values.nv1_2n),
        nv2_2n: Number(values.nv2_2n),
        nv3_2n: Number(values.nv3_2n),
        nv1_1n: Number(values.nv1_1n),
        nv2_1n: Number(values.nv2_1n),
        nv3_1n: Number(values.nv3_1n),
        nv1_ht: Number(values.nv1_ht),
        nv2_ht: Number(values.nv2_ht),
        nv3_ht: Number(values.nv3_ht),
      };
    } else {
      editScore = {
        layer: selectedLayer,
        nv1_2n: Number(values.nv1_2n),
        nv2_2n: Number(values.nv2_2n),
        nv1_1n: Number(values.nv1_1n),
        nv2_1n: Number(values.nv2_1n),
        nv1_ht: Number(values.nv1_ht),
        nv2_ht: Number(values.nv2_ht),
      };
    }
    updateScore(id, editScore, axiosJWT, dispatch);
    exitEditingMode();
  };

  return (
    listData && (
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
          displayColumnDefOptions={{ 'mrt-row-actions': { size: 90 } }}
          renderTopToolbarCustomActions={() => (
            <Box sx={{ display: "flex", gap: "1rem", p: "4px" }}>
              <select
                className="select-layer"
                value={selectedLayer}
                onChange={handleSelectLayer}
              >
                {schoolTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
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
      </Fragment>
    )
  );
};

export default ScoreTable;
