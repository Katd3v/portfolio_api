const Skill = require("../models/Skill");

exports.createSkill = (req, res, next) => {
  const skill = new Skill({
    ...req.body,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.files.image[0].filename
    }`,
    iconeLogo: `${req.protocol}://${req.get("host")}/images/${
      req.files.icone[0].filename
    }`,
  });
  skill
    .save()
    .then(() =>
      res.status(201).json({ message: "La compétence à bien été enregistrée" })
    )
    .catch((error) => res.status(400).json({ error }));
};

exports.getAllSkills = async (req, res, next) => {
  Skill.find()
    .then((skill) => res.status(200).json(skill))
    .catch((error) => res.status(400).json({ error }));
};
