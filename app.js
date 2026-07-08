const express = require("express");

const authRoutes = require("./routes/authRoutes");

const problemRoutes = require("./routes/problemRoutes");

const app = express();

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/problems", problemRoutes);

module.exports = app;