const Project = require("../models/Project");

exports.createProject = (req, res, next) => {
  const project = new Project(req.body);
  project
    .save()
    .then(() =>
      res.status(201).json({ message: "Le projet a bien été enregistrée" })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllProjects = (req, res, next) => {
  Project.find()
    .then((project) => res.status(200).json(project))
    .catch((error) => res.status(400).json({ error }));
};