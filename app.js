const express = require("express");
const mongoose = require("mongoose");

const Skill = require("./models/Skill");
const Project = require("./models/Project");
const { log } = require("console");

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

// Gestion des erreurs CORS
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
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

// middleware pour créer les skills
app.post("/skills", (req, res, next) => {
  const skill = new Skill(req.body);
  skill
    .save()
    .then(() =>
      res.status(201).json({ message: "La compétence à bien été enregistrée" })
    )
    .catch((error) => res.status(400).json({ error }));
});

// middleware pour afficher les skills
app.get("/skills", (req, res, next) => {
  Skill.find()
    .then((skill) => res.status(200).json(skill))
    .catch((error) => res.status(400).json({ error }));
});

// middleware pour creer un projet
app.post("/projects", (req, res, next) => {
  const project = new Project(req.body);
  project
    .save()
    .then(() =>
      res.status(201).json({ message: "Le projet a bien été enregistrée" })
    )
    .catch((error) => res.status(400).json({ error }));
});

// middleware pour afficher un projet
app.get("/projects", (req, res, next) => {
  Project.find()
    .then((project) => res.status(200).json(project))
    .catch((error) => res.status(400).json({ error }));
});

module.exports = app;
