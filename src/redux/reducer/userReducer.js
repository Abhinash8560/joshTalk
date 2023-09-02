
import {
    QUIZ_FAIL,
    QUIZ_REQUEST,
    QUIZ_SUCCESS,
  } from "../constants/userConstants";
  
  export const userReducer = (state = { quizData: [], loading: false, error: "" }, action) => {
    switch (action.type) {
      case QUIZ_REQUEST:
        return { ...state, loading: true };
      case QUIZ_SUCCESS:
        return { ...state, loading: false, quizData: action.payload };
      case QUIZ_FAIL:
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };
  