export const campusSorting = (campuses, students, sortBy) =>
  [...campuses].sort((a, b) => {
    if (sortBy === "nameDesc") {
      if (b.name < a.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    } else if (sortBy === "nameAsc") {
      if (a.name < b.name) {
        return -1;
      }
      if (b.name > a.name) {
        return 1;
      }
      return 0;
    } else if (sortBy === "enrollmentsAsc") {
      return (
        students.filter((s) => s.campusId * 1 === a.id).length -
        students.filter((s) => s.campusId * 1 === b.id).length
      );
    } else if (sortBy === "enrollmentsDesc") {
      return (
        students.filter((s) => s.campusId * 1 === b.id).length -
        students.filter((s) => s.campusId * 1 === a.id).length
      );
    }
  });

export const studentSorting = (students, sortBy) =>
  [...students].sort((a, b) => {
    if (sortBy === "lastNameDesc") {
      if (b.lastName < a.lastName) {
        return -1;
      }
      if (a.lastName > b.lastName) {
        return 1;
      }
      return 0;
    } else if (sortBy === "lastNameAsc") {
      if (a.lastName < b.lastName) {
        return -1;
      }
      if (b.lastName > a.lastName) {
        return 1;
      }
      return 0;
    } else if (sortBy === "gpaAsc") {
      return a.gpa * 1 - b.gpa * 1;
    } else if (sortBy === "gpaDesc") {
      return b.gpa * 1 - a.gpa * 1;
    }
  });
