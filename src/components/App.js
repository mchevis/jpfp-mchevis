import React, { Component } from "react";
import { HashRouter as Router, Route, Switch, NavLink } from "react-router-dom";
import { connect } from "react-redux";

import { fetchStudents } from "../store/student";
import { fetchCampuses } from "../store/campus";

import StudentList from "./student/StudentList";
import CampusList from "./campus/CampusList";
import SingleCampus from "./campus/SingleCampus";
import SingleStudent from "./student/SingleStudent";
import NotFound from "./NotFound"; //404 Page
import StudentForm from "./student/StudentForm";
import CampusForm from "./campus/CampusForm";

class App extends Component {
  componentDidMount() {
    this.props.fetchStudents();
    this.props.fetchCampuses();
  }

  render() {
    const { students, campuses } = this.props;
    return (
      <Router>
        <div id="app">
          <div id="header">JPFP</div>
          <nav id="nav">
            <NavLink
              exact
              to="/students"
              activeClassName="current"
              className="nav--link"
            >
              Students ({students.length})
            </NavLink>
            <NavLink
              exact
              to="/campuses"
              activeClassName="current"
              className="nav--link"
            >
              Campuses ({campuses.length})
            </NavLink>
          </nav>
          <main>
            <Switch>
              <Route exact path="/" component={StudentList} />
              <Route exact path="/campuses" component={CampusList} />
              <Route exact path="/campuses/create" component={CampusForm} />
              <Route
                exact
                path="/campuses/:id"
                render={(routeProps) =>
                  campuses.filter(
                    (c) => c.id === routeProps.match.params.id * 1
                  ).length > 0 ? (
                    <SingleCampus {...routeProps} />
                  ) : (
                    <NotFound />
                  )
                }
              />
              <Route exact path="/students" component={StudentList} />
              <Route exact path="/students/create" component={StudentForm} />
              <Route
                exact
                path="/students/:id"
                render={(routeProps) =>
                  students.filter(
                    (s) => s.id === routeProps.match.params.id * 1
                  ).length > 0 ? (
                    <SingleStudent {...routeProps} />
                  ) : (
                    <NotFound />
                  )
                }
              />
              <Route path="/" component={NotFound} />
            </Switch>
          </main>
          <footer>
            © 2022 Marina Chevis;{"   "}
            <a href="https://icons8.com/icon/60664/external-link">
              Icons by Icons8
            </a>
          </footer>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    campuses: state.campus.campuses,
    students: state.student.students,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCampuses: () => dispatch(fetchCampuses()),
    fetchStudents: () => dispatch(fetchStudents()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
