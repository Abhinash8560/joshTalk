
import axios from "axios";
import {
  QUIZ_REQUEST,
  QUIZ_SUCCESS,
  QUIZ_FAIL,
} from "../constants/userConstants";

export const fetchQuizData = () => async (dispatch) => {
  dispatch({ type: QUIZ_REQUEST });
  try {
    const res = await axios.get("https://opentdb.com/api.php?amount=15");

    if (res.status === 200) {
      dispatch({ type: QUIZ_SUCCESS, payload: res.data.results });
    } else {
      throw new Error(res.data);
    }
  } catch (error) {
    dispatch({ type: QUIZ_FAIL, payload: error.response.data.message });
  }
};
