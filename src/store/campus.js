import { createStore, applyMiddleware } from "redux";
import loggerMiddleware from "redux-logger";
import thunk from "redux-thunk";
import axios from "axios";

//ACTION TYPES
const GOT_CAMPUSES = "GOT_CAMPUSES";
const GOT_CAMPUS = "GOT_CAMPUS";
const CREATED_CAMPUS = "CREATED_CAMPUS";
const DELETED_CAMPUS = "DELETED_CAMPUS";
const UPDATE_CAMPUS = "UPDATE_CAMPUS";

//ACTION CREATORS

const gotCampuses = (campuses) => ({
  type: GOT_CAMPUSES,
  campuses,
});

const gotCampus = (campus) => ({
  type: GOT_CAMPUS,
  campus,
});

const createdCampus = (campus) => ({
  type: CREATED_CAMPUS,
  campus,
});

const deletedCampus = (deletedCampusId) => ({
  type: DELETED_CAMPUS,
  deletedCampusId,
});

const updatedCampus = (campus) => ({
  type: UPDATE_CAMPUS,
  campus,
});

//THUNKS

export const fetchCampuses = () => {
  return async (dispatch) => {
    const { data: campuses } = await axios.get("/api/campuses");
    dispatch(gotCampuses(campuses));
  };
};

export const fetchCampus = (campusId) => {
  return async (dispatch) => {
    const { data: campus } = await axios.get(`/api/campuses/${campusId}`);
    dispatch(gotCampus(campus));
  };
};

export const createCampus = (newCampus, history) => {
  return async (dispatch) => {
    const { data: campus } = await axios.post("/api/campuses", newCampus);
    dispatch(createdCampus(campus));
    history.push("/campuses");
  };
};

export const deleteCampus = (campusId) => {
  return async (dispatch) => {
    await axios.delete(`/api/campuses/${campusId}`);
    dispatch(deletedCampus(campusId));
  };
};

export const updateCampus = (campus) => {
  return async (dispatch) => {
    await axios.put(`/api/campuses/${campus.id}`, campus);
    dispatch(updatedCampus(campus));
  };
};

//INITIAL STATE
const initialState = {
  campuses: [],
  selectedCampus: {},
};

//REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_CAMPUSES:
      return { ...state, campuses: action.campuses };
    case GOT_CAMPUS:
      return { ...state, selectedCampus: action.campus };
    case CREATED_CAMPUS:
      return { ...state, campuses: [...state.campuses, action.campus] };
    case DELETED_CAMPUS:
      return {
        ...state,
        campuses: state.campuses.filter((c) => c.id !== action.deletedCampusId),
      };
    case UPDATE_CAMPUS:
      return {
        ...state,
        //update campus array
        campuses: state.campuses.map((c) =>
          c.id === action.campus.id ? action.campus : c
        ),
        //update selected campus
        selectedCampus:
          state.selectedCampus.id === action.campus.id
            ? action.campus
            : state.selectedCampus,
      };
    default:
      return state;
  }
};
