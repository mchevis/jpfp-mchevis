import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { createCampus, updateCampus } from "../../store/campus";

const initialState = {
  campus: { name: "", address: "", description: "", image: "" },
  buttonDisabled: true,
  isUpdate: false,
};

class UpdateCampusForm extends Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.campus.id && this.state.isUpdate) {
      this.setState({ campus: this.props.campus, isUpdate: true });
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.campus.id !== this.props.campus.id) {
      this.setState({ campus: this.props.campus, isUpdate: true });
    }
  }

  handleChange(e) {
    this.setState({
      campus: { ...this.state.campus, [e.target.name]: e.target.value },
      buttonDisabled: false,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    if (this.state.isUpdate) {
      this.props.updateCampus(this.state.campus);
    } else {
      this.props.createCampus(this.state.campus);
      this.setState(initialState);
    }
  }

  render() {
    return (
      <div className="form--div">
        <h3 className="form--header">
          {" "}
          {this.state.isUpdate ? "Update" : "Create"} Campus{" "}
        </h3>
        <form id="campus-form" onSubmit={this.handleSubmit}>
          <input
            name="name"
            value={this.state.campus.name}
            required
            placeholder="Name*"
            onChange={this.handleChange}
          />
          <input
            name="address"
            value={this.state.campus.address}
            required
            placeholder="Address*"
            onChange={this.handleChange}
          />
          <textarea
            form="campus-form"
            name="description"
            value={this.state.campus.description}
            placeholder="Description"
            onChange={this.handleChange}
          />
          <input
            name="image"
            type="url"
            value={this.state.campus.image || ""}
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
          <Link to={`/campuses`}>Back to List</Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    campus: state.campus.selectedCampus,
  };
};

const mapDispatchToProps = (dispatch, { history }) => {
  return {
    updateCampus: (campus) => dispatch(updateCampus(campus)),
    createCampus: (newCampus) => dispatch(createCampus(newCampus, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateCampusForm);
