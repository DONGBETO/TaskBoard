const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Import des routes
const authRoutes = require("./routers/authRoutes");
const projectRoutes = require("./routers/projectRoutes");
const taskRoutes = require("./routers/taskRoutes");
const memberRoutes = require("./routers/memberRoutes");
const adminRoutes = require("./routers/adminRoutes");

// Utilisation des routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/members", memberRoutes);
app.use("/api/responsable", projectRoutes); // pour les routes responsable/projects
app.use("/api/responsable", taskRoutes); // pour les routes responsable/tasks

// Connexion MongoDB + lancement du serveur
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Task Manager is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));
