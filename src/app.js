require("dotenv").config();
const path = require("path");
const express = require("express");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const managerRoutes = require("./routes/managerRoutes");
const teacherRoutes = require("./routes/teacherRoutes");
const studentRoutes = require("./routes/studentRoutes");
const authMiddleware = require("./middlewares/authMiddleware");
const roleMiddleware = require("./middlewares/roleMiddleware");
const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();
const swaggerDocument = YAML.load(path.join(__dirname, "..", "docs", "openapi.yaml"));

app.use(express.json());

app.get("/health", (_req, res) => {
  res.json({ success: true, message: "Server is healthy" });
});

app.get("/openapi.json", (_req, res) => {
  res.json(swaggerDocument);
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use("/api/auth", authRoutes);
app.use("/api/admin", authMiddleware, roleMiddleware("Admin"), adminRoutes);
app.use("/api/manager", authMiddleware, roleMiddleware("Manager", "Admin"), managerRoutes);
app.use("/api/teacher", authMiddleware, roleMiddleware("Teacher"), teacherRoutes);
app.use("/api/student", authMiddleware, roleMiddleware("Student"), studentRoutes);

app.use(errorMiddleware);

module.exports = app;
