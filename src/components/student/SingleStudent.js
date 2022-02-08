import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchStudent } from "../../store/student";
import StudentForm from "./StudentForm";
import StudentCard from "./StudentCard";

class SingleStudent extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchStudent(this.props.match.params.id);
  }

  render() {
    const { student: s, campus } = this.props;

    return (
      <div className="card--div single--page">
        <div>
          <h3 className="card--header">
            {s.firstName} {s.lastName}
          </h3>
        </div>
        <div className="card--details">
          <div className="card--image">
            {s.image ? <img src={s.image} /> : ""}
          </div>
          <ul className="card--details-list">
            <li>
              <span className="card--details-prop">Campus: </span>
              {s.campusId ? (
                <Link to={`/campuses/${s.campusId}`}>{campus.name}</Link>
              ) : (
                "Not enrolled"
              )}
            </li>
            <li className="truncated short">
              <span className="card--details-prop">Email: </span>
              {s.email}
            </li>
            <li>
              <span className="card--details-prop">GPA: </span>
              {s.gpa}
            </li>
          </ul>
        </div>
        <StudentForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.student.selectedStudent,
    campus: state.student.selectedStudent.campusId
      ? state.campus.campuses.filter(
          (c) => c.id === state.student.selectedStudent.campusId * 1
        )[0]
      : "",
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchStudent: (studentId) => dispatch(fetchStudent(studentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleStudent);

{
  /* <div className="student--details">
<div className="student--image">
  {student.image ? <img src={student.image} /> : ""}
</div>
<ul className="student--details-list">
  <li>
    Full Name: {student.firstName} {student.lastName}
  </li>
  <li>Email: {student.email}</li>
  <li>GPA: {student.gpa}</li>
  <li>
    Campus:{" "}
    <Link to={`/campuses/${student.campusId}`}>{campus.name}</Link>
  </li>
</ul>
</div> */
}
