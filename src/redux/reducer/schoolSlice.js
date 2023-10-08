import { createSlice } from "@reduxjs/toolkit";

const schoolSlice = createSlice({
    name: 'school',
    initialState: {
        show: {
            getAllData: null,
            isFetching: false,
            isError: false
        },
        create: {
            msgStatus: '',
            isFetching: false,
            isError: false        
        },
        update: {
            msgStatus: '',
            isFetching: false,
            isError: false        
        },
        delete: {
            msgStatus: '',
            isFetching: false,
            isError: false        
        }
    },
    reducers: {
        showDataStart: (state) => {
            state.show.isFetching = true;
        },
        showDataSuccess: (state, action) => {
            state.show.getAllData = action.payload;
            state.show.isFetching = false;
        },
        showDataFailed: (state) => {
            state.show.isFetching = false;
            state.show.isError = true;
        },
        createDataStart: (state) => {
            state.create.isFetching = true;
        },
        createDataSuccess: (state, action) => {
            state.create.isFetching = false;
            state.create.msgStatus = action.payload;
        },
        createDataFailed: (state, action) => {
            state.create.isFetching = false;
            state.create.msgStatus = action.payload;
            state.create.isError = true;
        },
        updateDataStart: (state) => {
            state.update.isFetching = true;
        },
        updateDataSuccess: (state, action) => {
            state.update.isFetching = false;
            state.update.msgStatus = action.payload;
        },
        updateDataFailed: (state, action) => {
            state.update.isFetching = false;
            state.update.msgStatus = action.payload;
            state.update.isError = true;
        },
        deleteDataStart: (state) => {
            state.delete.isFetching = true;
        },
        deleteDataSuccess: (state) => {
            state.delete.isFetching = false;
        },
        deleteDataFailed: (state, action) => {
            state.delete.isFetching = false;
            state.delete.isError = true;
            state.delete.msgStatus = action.payload;
        }
    }
})

export const getAllSchool = (state) => state.school.show?.getAllData

export const { 
    showDataStart, 
    showDataSuccess, 
    showDataFailed,
    createDataStart, 
    createDataSuccess, 
    createDataFailed,
    updateDataStart, 
    updateDataSuccess, 
    updateDataFailed,
    deleteDataStart, 
    deleteDataSuccess, 
    deleteDataFailed
} = schoolSlice.actions

export default schoolSlice.reducer