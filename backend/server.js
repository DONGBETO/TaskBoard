const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routers/authRoutes"));
// Connexion MongoDB + Lancement du s  erveur
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Task Manager is running on port ${process.env.PORT}`);
    });
  })
  .catch((err) => console.error(err));
