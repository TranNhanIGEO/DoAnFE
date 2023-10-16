import { createSlice } from "@reduxjs/toolkit";

const homeSlice = createSlice({
  name: "home",
  initialState: {
    visibleSidebar: true,
    visibleModalEnrollment: false,
    visibleModalStatistic: false,
    visibleOffCanvasEnrollment: false,
    visibleOffCanvasStatistic: false,
    visibleOffCanvasSchoolList: false,
    enrollmentCoords: [],
    enrollmentLastLayer: "",
    dataResponseEnrollment: [],
    dataResponseStatistic: [],
  },
  reducers: {
    toggleSidebar: (state, actions) => {
      state.visibleSidebar = !state.visibleSidebar || actions.payload;
    },
    toggleModalEnrollment: (state, actions) => {
      state.visibleModalEnrollment = !state.visibleModalEnrollment || actions.payload;
    },
    toggleModalStatistic: (state, actions) => {
      state.visibleModalStatistic = !state.visibleModalStatistic || actions.payload;
    },
    toggleOffCanvasEnrollment: (state, actions) => {
      state.visibleOffCanvasEnrollment = !state.visibleOffCanvasEnrollment || actions.payload;
    },
    toggleOffCanvasStatistic: (state, actions) => {
      state.visibleOffCanvasStatistic = !state.visibleOffCanvasStatistic || actions.payload;
    },
    toggleOffCanvasSchoolList: (state, actions) => {
      state.visibleOffCanvasSchoolList = !state.visibleOffCanvasSchoolList || actions.payload;
    },
    setEnrollmentCoords: (state, actions) => {
      state.enrollmentCoords = actions.payload;
    },
    setEnrollmentLastLayer: (state, actions) => {
      state.enrollmentLastLayer = actions.payload;
    },
    setDataResponseEnrollment: (state, actions) => {
      state.dataResponseEnrollment = actions.payload;
    },
    setDataResponseStatistic: (state, actions) => {
      state.dataResponseStatistic = actions.payload;
    },
  },
});

export const visibleSidebar = state => state.home.visibleSidebar
export const visibleModalEnrollment = state => state.home.visibleModalEnrollment
export const visibleModalStatistic = state => state.home.visibleModalStatistic
export const visibleOffCanvasEnrollment = state => state.home.visibleOffCanvasEnrollment
export const visibleOffCanvasStatistic = state => state.home.visibleOffCanvasStatistic
export const visibleOffCanvasSchoolList = state => state.home.visibleOffCanvasSchoolList
export const enrollmentCoords = state => state.home.enrollmentCoords
export const enrollmentLastLayer = state => state.home.enrollmentLastLayer
export const dataResponseEnrollment = state => state.home.dataResponseEnrollment
export const dataResponseStatistic = state => state.home.dataResponseStatistic

export const {
  toggleSidebar,
  toggleModalEnrollment,
  toggleModalStatistic,
  toggleOffCanvasEnrollment,
  toggleOffCanvasStatistic,
  toggleOffCanvasSchoolList,
  setEnrollmentCoords,
  setEnrollmentLastLayer,
  setDataResponseEnrollment,
  setDataResponseStatistic,
} = homeSlice.actions;

export default homeSlice.reducer;
