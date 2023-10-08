const sharp = require("sharp");
const fs = require("fs");

module.exports = (req, res, next) => {
  // creation du nom du futur fichier
  const refImg = `${req.files.image[0].filename.split(".")[0]}.webp`;

  // appliquer sharp
  sharp(req.files.image[0].path)
    .webp({ quality: 50 })
    .resize({ width: 352, height: 234 })
    .toFile(`images/${refImg}`, (err) => {
      if (err) {
        res
          .status(500)
          .json({ error: "Erreur lors de la conversion de l'image" });
      } else {
        // La conversion a réussi, supprimez le fichier d'origine
        fs.unlink(req.files.image[0].path, (unlinkErr) => {
          if (unlinkErr) {
            console.error(
              "Erreur lors de la suppression du fichier d'origine :",
              unlinkErr
            );
          }
        });
      }
    });

  // verifier si une deuxième image "icone" existe pour les skills
  if (req.files.icone) {
    const refIcon = `${req.files.icone[0].filename.split(".")[0]}.webp`;
    sharp(req.files.icone[0].path)
      .webp({ quality: 50 })
      .resize({ height: 48 })
      .toFile(`images/${refIcon}`, (err) => {
        if (err) {
          res
            .status(500)
            .json({ error: "Erreur lors de la conversion de l'image" });
        } else {
          // La conversion a réussi, supprimez le fichier d'origine
          fs.unlink(req.files.icone[0].path, (unlinkErr) => {
            if (unlinkErr) {
              console.error(
                "Erreur lors de la suppression du fichier d'origine :",
                unlinkErr
              );
            }
          });
        }
      });
    delete req.files.icone[0].filename;
    req.files.icone[0].filename = refIcon;
  }

  delete req.files.image[0].filename;
  req.files.image[0].filename = refImg;
  next();
};
