const Skill = require("../models/Skill");

exports.createSkill = (req, res, next) => {
  const skill = new Skill({
    ...req.body,
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
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

  // try {
  //   // Récupérer les compétences depuis la base de données par categorie
  //   const languages = await Skill.find({ category: "Langages" }).exec();
  //   const frameworks = await Skill.find({ category: "Frameworks" }).exec();
  //   const tools = await Skill.find({ category: "Outils" }).exec();

  //   // Créer l'objet de réponse
  //   const skills = [languages, frameworks, tools];

  //   // Renvoyer l'objet en tant que réponse JSON
  //   res.status(200).json(skills);
  // } catch (error) {
  //   console.error(error);
  //   res.status(500).json({
  //     error:
  //       "Une erreur s'est produite lors de la récupération des compétences.",
  //   });
  // }
};
