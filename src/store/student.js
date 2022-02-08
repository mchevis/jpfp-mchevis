import axios from "axios";

//ACTION TYPES
const GOT_STUDENTS = "GOT_STUDENTS";
const GOT_STUDENT = "GOT_STUDENT";
const CREATED_STUDENT = "CREATED_STUDENT";
const DELETED_STUDENT = "DELETED_STUDENT";
const UPDATE_STUDENT = "UPDATE_STUDENT";
const UNENROLLED_STUDENTS = "UNENROLLED_STUDENTS";

//ACTION CREATORS
const gotStudents = (students) => ({
  type: GOT_STUDENTS,
  students,
});

const gotStudent = (student) => ({
  type: GOT_STUDENT,
  student,
});

const createdStudent = (student) => ({
  type: CREATED_STUDENT,
  student,
});

const deletedStudent = (deletedStudentId) => ({
  type: DELETED_STUDENT,
  deletedStudentId,
});

const updatedStudent = (student) => ({
  type: UPDATE_STUDENT,
  student,
});

export const unenrollStudents = (deletedCampusId) => ({
  type: UNENROLLED_STUDENTS,
  deletedCampusId,
});

//THUNKS
export const fetchStudents = () => {
  return async (dispatch) => {
    const { data: students } = await axios.get("/api/students");
    dispatch(gotStudents(students));
  };
};

export const fetchStudent = (studentId) => {
  return async (dispatch) => {
    const { data: student } = await axios.get(`/api/students/${studentId}`);
    dispatch(gotStudent(student));
  };
};

export const createStudent = (newStudent, history) => {
  return async (dispatch) => {
    const { data: student } = await axios.post("/api/students", newStudent);
    dispatch(createdStudent(student));
    history.push("/students");
  };
};

export const deleteStudent = (studentId) => {
  return async (dispatch) => {
    await axios.delete(`/api/students/${studentId}`);
    dispatch(deletedStudent(studentId));
  };
};

export const updateStudent = (student) => {
  return async (dispatch) => {
    await axios.put(`/api/students/${student.id}`, student);
    dispatch(updatedStudent(student));
  };
};

//INITIAL STATE
const initialState = {
  students: [],
  selectedStudent: {},
};

//REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case GOT_STUDENTS:
      return { ...state, students: action.students };
    case GOT_STUDENT:
      return { ...state, selectedStudent: action.student };
    case CREATED_STUDENT:
      return { ...state, students: [...state.students, action.student] };
    case DELETED_STUDENT:
      return {
        ...state,
        students: state.students.filter(
          (s) => s.id !== action.deletedStudentId
        ),
      };
    case UPDATE_STUDENT:
      return {
        ...state,
        //update students array
        students: state.students.map((s) =>
          s.id === action.student.id ? action.student : s
        ),
        //update selected student
        selectedStudent:
          state.selectedStudent.id === action.student.id
            ? {
                ...action.student,
              }
            : state.selectedStudent,
      };
    case UNENROLLED_STUDENTS:
      return {
        ...state,
        //remove enrollments for deleted campuses
        students: state.students.map((s) =>
          s.campusId === action.deletedCampusId ? { ...s, campusId: null } : s
        ),
      };
    default:
      return state;
  }
};
