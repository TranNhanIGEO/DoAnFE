import { 
    updateScoreStart, 
    updateScoreSuccess, 
    updateScoreFailed,
    showScoreStart,
    showScoreSuccess,
    showScoreFailed
} from "src/redux/reducer/scoreSlice"

const showScore = async (layer, axiosJWT, dispatch) => {
    dispatch(showScoreStart())
    try {
        const res = await axiosJWT.get(`/v1/data/score?layer=${layer}`);
        dispatch(showScoreSuccess(res.data))
    }
    catch (err) {
        dispatch(showScoreFailed())
    }
}
const updateScore = async (id, updateScore, axiosJWT, dispatch) => {
    dispatch(updateScoreStart())
    try {
        const res = await axiosJWT.put(`/v1/data/score/${id}/update`, updateScore);
        dispatch(updateScoreSuccess(res.data))
    }
    catch (err) {
        dispatch(updateScoreFailed(err.response))
    }
}

export {
    showScore,
    updateScore
}