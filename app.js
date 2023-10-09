const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const path = require("path");
const projectRoutes = require("./routes/project");
const skillRoutes = require("./routes/skill");
const mailRoutes = require("./routes/mail");

const app = express();

mongoose
  .connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connexion à MongoDB réussie !"))
  .catch(() => console.log("Connexion à MongoDB échouée !"));

// Extraction du corps JSON afin de gérer la requête POST venant de l'application front-end
app.use(express.json());

// Middleware pour analyser le corps des requêtes en JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Gestion des erreurs CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", process.env.ORIGIN);
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use("/skills", skillRoutes);
app.use("/projects", projectRoutes);
app.use("/mail", mailRoutes);

// créer une route statique pour les images
app.use("/images", express.static(path.join(__dirname, "images")));

module.exports = app;
