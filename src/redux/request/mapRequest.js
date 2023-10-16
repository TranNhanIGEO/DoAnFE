import axios from "axios"
import { axiosAPI } from "src/utils/axiosConfig"

const apiGetListAddressDB = async (valueAddress) => {
    try {
        const res = valueAddress 
            ? await axiosAPI.get(`/v1/maps/getaddress?address=${valueAddress}`)
            : await axiosAPI.get(`/v1/maps/getaddress`)
        return res.data
    } 
    catch (err) {
        return err.response.data
    }
}

const apiGetListAddressMB = async (valueAddress, params) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_MAPBOX_HOST}/geocoding/v5/mapbox.places/${valueAddress}.json` + params)
        return res.data
    } 
    catch (err) {
        return err.response.data
    }
}

const apiAdvisingEnrollment = async (params) => {
    try {
        const res = await axiosAPI.get(`/v1/maps/advisingenrollment` + params)
        return res.data
    } 
    catch (err) {
        return err.response.data
    }
}

const apiGetOneRoute = async (startPoint, endPoint, params) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_MAPBOX_HOST}/directions/v5/mapbox/driving/${startPoint};${endPoint}` + params)
        return res.data
    } 
    catch (err) {
        return err.response.data
    }
}

const apiGetMultiRoute = async (startPoint, endPoint, params) => {
    try {
        const res = await axios.get(`${process.env.REACT_APP_MAPBOX_HOST}/directions-matrix/v1/mapbox/driving/${startPoint};${endPoint}` + params)
        return res.data
    } 
    catch (err) {
        return err.response.data
    }
}

const apiGetSchoolList = async (params) => {
    try {
        const res = await axiosAPI.get(`/v1/maps/getlayerstatistic` + params)
        return res.data
    }
    catch (err) {
        return err.response.data
    }
}

const apiRenderChart = async (params) => {
    try {
        const res = await axiosAPI.get(`/v1/maps/renderchart` + params)
        return res.data
    } 
    catch (err) {
        return err.response.data
    }
}

const apiGetSchoolName = async (params) => {
    try {
        const res = params
            ? await axiosAPI.get(`/v1/maps/getschoolname` + params)
            : await axiosAPI.get(`/v1/maps/getschoolname`)
        return res.data
    } 
    catch (err) {
        return err.response.data
    }
}

export {
    apiGetListAddressDB,
    apiGetListAddressMB,
    apiAdvisingEnrollment,
    apiGetOneRoute,
    apiGetMultiRoute,
    
    apiGetSchoolList,
    apiRenderChart,

    apiGetSchoolName
}