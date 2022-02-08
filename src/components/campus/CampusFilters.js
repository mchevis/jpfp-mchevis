import React, { Component } from "react";
import { connect } from "react-redux";
import { applySort } from "../../store/campus";

class CampusFilters extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortBy: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.applySort(this.state.sortBy);
  }

  render() {
    const { campuses } = this.props;

    return (
      <div id="filters--div">
        <p>Filters:</p>
        <form className="filters--form" onSubmit={this.handleSubmit}>
          <select
            name="sortBy"
            value={this.state.sortBy || 0}
            onChange={this.handleChange}
          >
            <option value={0} disabled>
              Sort By...
            </option>
            <option value={"nameAsc"}>{"Name (A -> Z)"}</option>
            <option value={"enrollmentsAsc"}>
              {"Enrollments (low -> high)"}
            </option>
            <option value={"enrollmentsDesc"}>
              {"Enrollments (high -> low)"}
            </option>
          </select>
          <button className="button">
            <span>Apply</span>
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campus.campuses,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    applySort: (sortBy) => dispatch(applySort(sortBy)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CampusFilters);
