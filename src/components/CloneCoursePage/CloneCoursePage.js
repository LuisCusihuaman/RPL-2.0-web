// @flow
import React from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import { withState } from "../../utils/State";
import CourseForm from "../CourseForm/CourseForm";
import type { Course } from "../../types";
import ErrorNotification from "../../utils/ErrorNotification";
import coursesService from "../../services/coursesService";

type Props = {
  classes: any,
  history: any,
  context: any,
};

type State = {
  error: { open: boolean, message: ?string },
  courseToClone: ?Course,
  courses: Array<Course>,
};

class CloneCoursePage extends React.Component<Props, State> {
  state = {
    error: { open: false, message: null },
    courseToClone: undefined,
    courses: [],
  };

  componentDidMount() {
    this.loadCourses();
  }

  loadCourses() {
    coursesService
      .getAll()
      .then(response => {
        this.setState({ courses: response });
      })
      .catch(() => {
        this.setState({
          error: {
            open: true,
            message: "Hubo un error al buscar los cursos, Por favor reintenta",
          },
        });
      });
  }

  render() {
    const { history } = this.props;
    const { courses, error, courseToClone } = this.state;
    return (
      <div>
        {error.open && <ErrorNotification open={error.open} message={error.message} />}
        {/* <CourseSelector /> */}
        <Autocomplete
          margin="normal"
          options={courses}
          id="courseToClone"
          name="courseToClone"
          autoComplete="courseToClone"
          onChange={(event, newValue) => this.setState({ courseToClone: newValue })}
          getOptionLabel={course => `${course.name} ${course.semester} (ID:${course.id})`}
          renderInput={params => <TextField {...params} label="Curso a clonar" margin="normal" />}
        />
        <CourseForm history={history} course={courseToClone} cloneMode />
      </div>
    );
  }
}

export default withState(CloneCoursePage);
