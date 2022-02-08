import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteStudent } from "../../store/student";
import StudentCard from "./StudentCard";
import { studentSorting } from "../../../bin/utilities/sort";

class StudentList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "",
    };
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleDelete(e, studentId) {
    e.preventDefault();
    this.props.deleteStudent(studentId);
  }

  render() {
    const { students, campuses } = this.props;
    const sortedStudents = studentSorting(students, this.state.sortBy);
    return (
      <div className="page">
        <div id="page--topbar">
          <div id="controls">
            <div className="sort--div">
              <select
                name="sortBy"
                value={this.state.sortBy || 0}
                onChange={this.handleChange}
              >
                <option value={0} disabled>
                  Sort By...
                </option>
                <option value={"lastNameAsc"}>{"Last Name (A -> Z)"}</option>
                <option value={"lastNameDesc"}>{"Last Name (Z -> A)"}</option>
                <option value={"gpaAsc"}>{"GPA (low -> high)"}</option>
                <option value={"gpaDesc"}>{"GPA (high -> low)"}</option>
              </select>
            </div>
          </div>
          <div className="button">
            <span>
              <Link to={`/students/create`}>
                <span id="plus-icon">+</span> New Student
              </Link>
            </span>
          </div>
        </div>
        <div className="list">
          {sortedStudents.map((s) => {
            let campus =
              campuses.filter((c) => c.id === s.campusId * 1)[0] || [];
            return <StudentCard key={s.id} s={s} campus={campus} />;
          })}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.student.students,
    campuses: state.campus.campuses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (studentId) => dispatch(deleteStudent(studentId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(StudentList);
