import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import CampusCard from "./CampusCard";
import { campusSorting } from "../../../bin/utilities/sort";

class CampusList extends Component {
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

  handleDelete(e, campusId) {
    e.preventDefault();
    this.props.deleteCampus(campusId);
  }

  render() {
    const { campuses, students } = this.props;
    const sortedCampuses = campusSorting(campuses, students, this.state.sortBy);
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
                <option value={"nameAsc"}>{"Name (A -> Z)"}</option>
                <option value={"nameDesc"}>{"Name (Z -> A)"}</option>
                <option value={"enrollmentsAsc"}>
                  {"Enrollments (low -> high)"}
                </option>
                <option value={"enrollmentsDesc"}>
                  {"Enrollments (high -> low)"}
                </option>
              </select>
            </div>
          </div>
          <div className="button">
            <span>
              <Link to={`/campuses/create`}>
                <span id="plus-icon">+</span> New Campus
              </Link>
            </span>
          </div>
        </div>
        <div className="list">
          {sortedCampuses.map((c) => (
            <CampusCard key={c.id} c={c} />
          ))}
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campus.campuses,
    students: state.student.students,
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     deleteCampus: (campusId) => dispatch(deleteCampus(campusId)),
//   };
// };

export default connect(mapStateToProps)(CampusList);
