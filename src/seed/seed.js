require("dotenv").config();
const { sequelize, Role } = require("../models");
const adminService = require("../services/adminService");
const managerService = require("../services/managerService");
const authService = require("../services/authService");

const seed = async () => {
  const now = new Date();
  const yearStart = now.getFullYear();
  const yearEnd = yearStart + 1;
  const nextMonth = new Date(now);
  nextMonth.setMonth(now.getMonth() + 1);
  const plusFourMonths = new Date(now);
  plusFourMonths.setMonth(now.getMonth() + 4);

  await sequelize.sync({ force: true });

  await Role.bulkCreate([
    { role_name: "Admin" },
    { role_name: "Manager" },
    { role_name: "Teacher" },
    { role_name: "Student" },
  ]);

  const department = await adminService.createDepartment({
    name: "Computer Science",
    description: "Department of Computer Science",
  });

  const year = await adminService.createAcademicYear({ year_range: `${yearStart}-${yearEnd}` });
  const semester = await adminService.createSemester({
    academic_year_id: year.id,
    semester_name: `Active Semester ${yearStart}`,
    is_active: true,
    reg_start_date: now.toISOString().slice(0, 10),
    reg_end_date: nextMonth.toISOString().slice(0, 10),
    start_date: now.toISOString().slice(0, 10),
    end_date: plusFourMonths.toISOString().slice(0, 10),
  });

  const admin = await adminService.createUser({
    first_name: "System",
    last_name: "Admin",
    email: "admin@scms.local",
    password: "Admin123!",
    role_name: "Admin",
  });

  const manager = await adminService.createUser({
    first_name: "Academic",
    last_name: "Manager",
    email: "manager@scms.local",
    password: "Manager123!",
    role_name: "Manager",
  });

  const teacher = await adminService.createUser({
    first_name: "Course",
    last_name: "Teacher",
    email: "teacher@scms.local",
    password: "Teacher123!",
    role_name: "Teacher",
  });

  await adminService.assignManagerToDepartment(department.id, manager.id);

  const course = await managerService.createCourse({
    course_code: "CS101",
    course_name: "Introduction to Programming",
    credits: 5,
    hours: 75,
    cycle: "Professional",
    type: "basic",
    department_id: department.id,
  });

  const curriculum = await managerService.createCurriculum({
    name: "Software Engineering 2025",
    department_id: department.id,
    academic_year_id: year.id,
  });

  await managerService.addCourseToCurriculum({
    curriculum_id: curriculum.id,
    course_id: course.id,
    suggested_semester: 1,
  });

  const group = await adminService.createGroup({
    group_name: "SE-25-1",
    department_id: department.id,
    curriculum_id: curriculum.id,
  });

  await managerService.activateSemesterCourse({
    semester_id: semester.id,
    course_id: course.id,
    teacher_id: teacher.id,
    is_active: true,
    syllabus: "Programming basics, variables, conditions, loops.",
  });

  await authService.registerStudent({
    first_name: "Demo",
    last_name: "Student",
    email: "student@scms.local",
    password: "Student123!",
    group_id: group.id,
    student_id_number: "STU-0001",
  });

  console.log("Seed completed successfully");
  await sequelize.close();
  void admin;
};

seed().catch(async (error) => {
  console.error("Seed failed:", error);
  await sequelize.close();
  process.exit(1);
});
