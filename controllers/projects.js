const { log } = require("console");

const Project = require("../models/Project");

exports.createProject = (req, res, next) => {
  const project = new Project({
    ...req.body,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });
  project
    .save()
    .then(() =>
      res.status(201).json({ message: "Le projet a bien été enregistré" })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllProjects = (req, res, next) => {
  Project.find()
    .then((project) => res.status(200).json(project))
    .catch((error) => res.status(400).json({ error }));
};
