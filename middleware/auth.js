require("dotenv").config();

const authToken = process.env.TOKEN;

// Middleware de vérification du token
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token);
    if (token === authToken) {
      next(); // Token valide, autorise la demande
    }
  } catch (error) {
    res.sendStatus(403); // Interdit
  }
};
