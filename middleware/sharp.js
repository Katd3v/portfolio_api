const sharp = require("sharp");

module.exports = (req, res, next) => {
  const refImg = `${req.file.filename.split(".")[0]}.webp`;
  sharp(req.file.path)
    .webp({ quality: 20 })
    .toFile(`images/${refImg}`, (err) => {
      if (err) {
        res
          .status(500)
          .json({ error: "Erreur lors de la conversion de l'image" });
      }
    });
  delete req.file.filename;
  req.file.filename = refImg;
  next();
};
