const nodemailer = require("nodemailer");

// Configuration du transporteur Nodemailer utilisant le transport SMTP par défaut
const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
  secure: true,
});

exports.sendMail = (req, res, next) => {
  const { email, name, firstname, message } = req.body;
  const mailData = {
    from: email,
    to: process.env.EMAIL,
    subject: "Contact via le portfolio",
    name: name,
    firstname: firstname,
    text: message,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(info);
    res.status(200).send({ message: "Mail envoyé" });
  });
};
