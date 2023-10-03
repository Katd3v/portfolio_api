const sharp = require("sharp");
const fs = require("fs");

module.exports = (req, res, next) => {
  const refImg = `${req.file.filename.split(".")[0]}.webp`;
  sharp(req.file.path)
    .webp({ quality: 20 })
    .toFile(`images/${refImg}`, (err) => {
      if (err) {
        res
          .status(500)
          .json({ error: "Erreur lors de la conversion de l'image" });
      } else {
        // La conversion a réussi, supprimez le fichier d'origine
        fs.unlink(req.file.path, (unlinkErr) => {
          if (unlinkErr) {
            console.error(
              "Erreur lors de la suppression du fichier d'origine :",
              unlinkErr
            );
          }
        });
      }
    });
  delete req.file.filename;
  req.file.filename = refImg;
  next();
};
