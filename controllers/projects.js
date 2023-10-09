const Project = require("../models/Project");
const Skill = require("../models/Skill");

exports.createProject = async (req, res, next) => {
  //récupérer les noms des langages dans le corps de la requête
  const languageNames = req.body.languages.split(",");

  try {
    //rechercher les compétences correspondant dans Skill
    const foundSkills = await Skill.find({ title: { $in: languageNames } });

    //récupérer les images des compétences trouvées
    const languageImage = foundSkills.map((skill) => skill.iconeLogo);

    //créer le nouveau projet
    const project = new Project({
      ...req.body,
      imageUrl: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
      languages: languageImage,
    });

    // sauvegarder le projet
    await project.save();

    return res.status(201).json({ message: "Le projet a bien été enregistré" });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

exports.getAllProjects = (req, res, next) => {
  Project.find()
    .then((project) => res.status(200).json(project))
    .catch((error) => res.status(400).json({ error }));
};
