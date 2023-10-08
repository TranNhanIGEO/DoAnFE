import {
    createDataFailed,
    createDataStart,
    createDataSuccess,
    deleteDataFailed,
    deleteDataStart,
    deleteDataSuccess,
    showDataFailed,
    showDataStart,
    showDataSuccess,
    updateDataFailed,
    updateDataStart,
    updateDataSuccess
} from "src/redux/reducer/schoolSlice"

const showAllData = async (layer, axiosJWT, dispatch) => {
    dispatch(showDataStart())
    try {
        const res = await axiosJWT.get(`/v1/data?layer=${layer}`);
        dispatch(showDataSuccess(res.data))
    }
    catch {
        dispatch(showDataFailed())
    }
}
const createData = async (newData, axiosJWT, dispatch) => {
    dispatch(createDataStart())
    try {
        const res = await axiosJWT.post(`/v1/data/create`, newData);
        dispatch(createDataSuccess(res.data))
    }
    catch (err) {
        dispatch(createDataFailed(err.response))
    }
}
const updateData = async (id, updateData, axiosJWT, dispatch) => {
    dispatch(updateDataStart())
    try {
        const res = await axiosJWT.put(`/v1/data/${id}/update`, updateData);
        dispatch(updateDataSuccess(res.data))
    }
    catch (err) {
        dispatch(updateDataFailed(err.response))
    }
}
const deleteData = async (layer, id, axiosJWT, dispatch) => {
    dispatch(deleteDataStart())
    try {
        await axiosJWT.delete(`/v1/data/${id}/delete?layer=${layer}`);
        dispatch(deleteDataSuccess())
    }
    catch (err) {
        dispatch(deleteDataFailed(err.response))
    }
}

export {
    showAllData,
    createData,
    updateData,
    deleteData
}