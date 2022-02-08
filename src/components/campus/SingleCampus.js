import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCampus } from "../../store/campus";
import { updateStudent } from "../../store/student";
import CampusForm from "./CampusForm";

class SingleCampus extends Component {
  constructor(props) {
    super(props);
    this.handleUnregistration = this.handleUnregistration.bind(this);
  }

  componentDidMount() {
    this.props.fetchCampus(this.props.match.params.id);
  }

  handleUnregistration(e, student) {
    e.preventDefault();
    this.props.updateStudent({ ...student, campusId: null });
  }

  render() {
    const { campus, students } = this.props;
    return (
      <div className="single--page card--div">
        <div>
          <h2 className="card--header">{campus.name}</h2>
        </div>
        <div className="card--details">
          <div className="card--image">
            {campus.image ? <img src={campus.image} /> : ""}
          </div>
          <ul className="card--details-list">
            <li>
              # of Students:{" "}
              {students.filter((s) => s.campusId * 1 === campus.id).length}
            </li>
            <li>Address: {campus.address}</li>
            <li>Description: {campus.description}</li>
          </ul>
        </div>
        <div className="single--enrollees">
          <h4>Enrollees</h4>
          <ul className="single--enrollees-list">
            {!campus.id || students.length === 0 ? (
              <li>This campus has no enrolled students</li>
            ) : (
              students.map((s) => (
                <li className="single--enrollees-list-item" key={s.id}>
                  {s.firstName} {s.lastName}
                  <div className="card--buttons buttons">
                    <div className="button">
                      <span>
                        <Link to={`/students/${s.id}`}>
                          View/Edit <div className="icons8-edit"></div>
                        </Link>
                      </span>
                    </div>
                    <div
                      className="button"
                      onClick={(e) => this.handleUnregistration(e, s)}
                    >
                      <span>
                        Unregister <div class="icons8-close"></div>
                      </span>
                    </div>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <CampusForm />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    campus: state.campus.selectedCampus,
    students: state.student.students.filter(
      (s) => s.campusId * 1 === state.campus.selectedCampus.id
    ),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampus: (campusId) => dispatch(fetchCampus(campusId)),
    updateStudent: (student) => dispatch(updateStudent(student)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleCampus);
