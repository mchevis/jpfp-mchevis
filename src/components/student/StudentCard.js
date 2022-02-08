import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { deleteStudent } from "../../store/student";

class StudentCard extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e, studentId) {
    e.preventDefault();
    this.props.deleteStudent(studentId);
  }

  render() {
    const { s, campus } = this.props;
    return (
      <div className="card--div">
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
        <div className="card--buttons buttons">
          <div className="button">
            <span>
              <Link to={`/students/${s.id}`}>
                View/Edit <div className="icons8-edit"></div>
              </Link>
            </span>
          </div>
          <div className="button" onClick={(e) => this.handleDelete(e, s.id)}>
            <span>
              <div className="icons8-trash"></div> Delete
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    deleteStudent: (studentId) => dispatch(deleteStudent(studentId)),
  };
};

export default connect(null, mapDispatchToProps)(StudentCard);
