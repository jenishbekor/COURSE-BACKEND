const sequelize = require("../config/database");
const defineRole = require("./role");
const defineUser = require("./user");
const defineDepartment = require("./department");
const defineDeptManager = require("./deptManager");
const defineAcademicYear = require("./academicYear");
const defineSemester = require("./semester");
const defineCourse = require("./course");
const defineCurriculum = require("./curriculum");
const defineCurriculumCourse = require("./curriculumCourse");
const defineSemesterCourse = require("./semesterCourse");
const defineGroup = require("./group");
const defineStudent = require("./student");
const defineEnrollment = require("./enrollment");

const Role = defineRole(sequelize);
const User = defineUser(sequelize);
const Department = defineDepartment(sequelize);
const DeptManager = defineDeptManager(sequelize);
const AcademicYear = defineAcademicYear(sequelize);
const Semester = defineSemester(sequelize);
const Course = defineCourse(sequelize);
const Curriculum = defineCurriculum(sequelize);
const CurriculumCourse = defineCurriculumCourse(sequelize);
const SemesterCourse = defineSemesterCourse(sequelize);
const Group = defineGroup(sequelize);
const Student = defineStudent(sequelize);
const Enrollment = defineEnrollment(sequelize);

Role.hasMany(User, { foreignKey: "role_id", as: "users" });
User.belongsTo(Role, { foreignKey: "role_id", as: "role" });

Department.belongsToMany(User, {
  through: DeptManager,
  foreignKey: "department_id",
  otherKey: "manager_id",
  as: "managers",
});
User.belongsToMany(Department, {
  through: DeptManager,
  foreignKey: "manager_id",
  otherKey: "department_id",
  as: "managedDepartments",
});

AcademicYear.hasMany(Semester, { foreignKey: "academic_year_id", as: "semesters" });
Semester.belongsTo(AcademicYear, { foreignKey: "academic_year_id", as: "academicYear" });

Department.hasMany(Course, { foreignKey: "department_id", as: "courses" });
Course.belongsTo(Department, { foreignKey: "department_id", as: "department" });

Department.hasMany(Curriculum, { foreignKey: "department_id", as: "curriculums" });
Curriculum.belongsTo(Department, { foreignKey: "department_id", as: "department" });

AcademicYear.hasMany(Curriculum, { foreignKey: "academic_year_id", as: "curriculums" });
Curriculum.belongsTo(AcademicYear, { foreignKey: "academic_year_id", as: "academicYear" });

Curriculum.belongsToMany(Course, {
  through: CurriculumCourse,
  foreignKey: "curriculum_id",
  otherKey: "course_id",
  as: "courses",
});
Course.belongsToMany(Curriculum, {
  through: CurriculumCourse,
  foreignKey: "course_id",
  otherKey: "curriculum_id",
  as: "curriculums",
});
CurriculumCourse.belongsTo(Curriculum, { foreignKey: "curriculum_id", as: "curriculum" });
CurriculumCourse.belongsTo(Course, { foreignKey: "course_id", as: "course" });

Semester.hasMany(SemesterCourse, { foreignKey: "semester_id", as: "semesterCourses" });
SemesterCourse.belongsTo(Semester, { foreignKey: "semester_id", as: "semester" });

Course.hasMany(SemesterCourse, { foreignKey: "course_id", as: "semesterCourses" });
SemesterCourse.belongsTo(Course, { foreignKey: "course_id", as: "course" });

User.hasMany(SemesterCourse, { foreignKey: "teacher_id", as: "teachingAssignments" });
SemesterCourse.belongsTo(User, { foreignKey: "teacher_id", as: "teacher" });

Department.hasMany(Group, { foreignKey: "department_id", as: "groups" });
Group.belongsTo(Department, { foreignKey: "department_id", as: "department" });

Curriculum.hasMany(Group, { foreignKey: "curriculum_id", as: "groups" });
Group.belongsTo(Curriculum, { foreignKey: "curriculum_id", as: "curriculum" });

User.hasOne(Student, { foreignKey: "user_id", as: "studentProfile" });
Student.belongsTo(User, { foreignKey: "user_id", as: "user" });

Group.hasMany(Student, { foreignKey: "group_id", as: "students" });
Student.belongsTo(Group, { foreignKey: "group_id", as: "group" });

Student.belongsToMany(SemesterCourse, {
  through: Enrollment,
  foreignKey: "student_id",
  otherKey: "semester_course_id",
  as: "semesterCourses",
});
SemesterCourse.belongsToMany(Student, {
  through: Enrollment,
  foreignKey: "semester_course_id",
  otherKey: "student_id",
  as: "students",
});

Enrollment.belongsTo(Student, { foreignKey: "student_id", as: "student" });
Enrollment.belongsTo(SemesterCourse, { foreignKey: "semester_course_id", as: "semesterCourse" });

module.exports = {
  sequelize,
  Role,
  User,
  Department,
  DeptManager,
  AcademicYear,
  Semester,
  Course,
  Curriculum,
  CurriculumCourse,
  SemesterCourse,
  Group,
  Student,
  Enrollment,
};
