const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Settings:
app.set("port", process.env.PORT_NODEJS || 5000);

// Middlewares:
app.use(morgan("dev"));
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: false, limit: "10mb" }));
app.use(cors());

// Routes:
app.use(require("./routes/index.js"));
app.use("/horarios", require("./routes/horarios.routes"));
app.use("/cursos", require("./routes/cursos.routes"));

// 404 handler
app.use((req, res, next) => {
    res.status(404).send("404 Not Found ❌");
});

module.exports = app;