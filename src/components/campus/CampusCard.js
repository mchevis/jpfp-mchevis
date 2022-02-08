import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { deleteCampus } from "../../store/campus";
import { unenrollStudents } from "../../store/student";

class CampusCard extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(e, campusId) {
    e.preventDefault();
    this.props.deleteCampus(campusId);
    this.props.unenrollStudents(campusId);
  }

  render() {
    const { c, students } = this.props;
    return (
      <div className="card--div">
        <div>
          <h3 className="card--header">{c.name}</h3>
        </div>
        <div className="card--details">
          <ul className="card--details-list">
            <li>
              # of Students:{" "}
              {students.filter((s) => s.campusId * 1 === c.id).length}
            </li>
            <li>Address: {c.address}</li>
            {c.description ? (
              <li className="truncated">Description: {c.description}</li>
            ) : (
              ""
            )}
          </ul>
          <div className="card--image">
            {c.image ? <img src={c.image} /> : ""}
          </div>
        </div>
        <div className="card--buttons buttons">
          <div className="button">
            <span>
              <Link to={`/campuses/${c.id}`}>
                View/Edit <div className="icons8-edit"></div>
              </Link>
            </span>
          </div>
          <div className="button" onClick={(e) => this.handleDelete(e, c.id)}>
            <span>
              <div className="icons8-trash"></div> Delete
            </span>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    students: state.student.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    deleteCampus: (campusId) => dispatch(deleteCampus(campusId)),
    unenrollStudents: (campusId) => dispatch(unenrollStudents(campusId)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusCard);
