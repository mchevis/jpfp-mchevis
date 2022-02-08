import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createStudent, updateStudent } from "../../store/student";

const initialState = {
  student: {
    firstName: "",
    lastName: "",
    email: "",
    gpa: "",
    campusId: 0,
    image: "",
  },
  buttonDisabled: true,
  isUpdate: false,
};

class UpdateStudentForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.student.id && this.state.isUpdate) {
      this.setState({ student: this.props.student, isUpdate: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.student.id !== this.props.student.id) {
      this.setState({ student: this.props.student, isUpdate: true });
    }
  }

  handleChange(e) {
    this.setState({
      student: { ...this.state.student, [e.target.name]: e.target.value },
      buttonDisabled: false,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.isUpdate) {
      this.props.updateStudent(this.state.student);
    } else {
      if (!this.state.student.campusId) {
        delete this.state.student.campusId;
      }
      this.props.createStudent(this.state.student);
      this.setState(initialState);
    }
  }

  render() {
    const { campuses } = this.props;

    return (
      <div className="form--div">
        <h3 className="form--header">
          {" "}
          {this.state.isUpdate ? "Update" : "Create"} Student{" "}
        </h3>
        <form id="student-form" onSubmit={this.handleSubmit}>
          <div className="form--studentNames">
            <input
              name="firstName"
              value={this.state.student.firstName}
              required
              placeholder="First Name*"
              onChange={this.handleChange}
            />
            <input
              name="lastName"
              value={this.state.student.lastName}
              required
              placeholder="Last Name*"
              onChange={this.handleChange}
            />
          </div>
          <input
            name="email"
            type="email"
            value={this.state.student.email}
            required
            placeholder="Email*"
            onChange={this.handleChange}
          />
          <input
            name="gpa"
            type="number"
            min={0}
            max={4}
            step={0.1}
            value={this.state.student.gpa}
            required
            placeholder="GPA*"
            onChange={this.handleChange}
          />

          <select
            name="campusId"
            value={this.state.student.campusId || 0}
            onChange={this.handleChange}
            required
          >
            <option value={0} disabled>
              Select a campus
            </option>
            {campuses.map((c) => (
              <option value={c.id} key={c.id}>
                {c.name}
              </option>
            ))}
          </select>
          <input
            name="image"
            value={this.state.student.image}
            placeholder="Image URL"
            onChange={this.handleChange}
          />
          <p className="form--footer">*Required Fields</p>
          <button
            type="submit"
            className="button"
            disabled={this.state.buttonDisabled}
          >
            <span>{this.state.isUpdate ? "Update" : "Create"}</span>
          </button>
        </form>
        <div className="single--back">
          <Link to={`/students`}>Back to List</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    student: state.student.selectedStudent,
    campuses: state.campus.campuses,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    createStudent: (newStudent) => dispatch(createStudent(newStudent, history)),
    updateStudent: (student) => dispatch(updateStudent(student)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateStudentForm);
