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
  const { email, name, firstName, subject, phone, message } = req.body;
  const mailData = {
    from: email,
    to: process.env.EMAIL,
    subject: `Contact via le portfolio : ${subject}`,
    name: name,
    firstName: firstName,
    text: `Nom : ${name}, Prénom : ${firstName}, Object : ${subject}, Téléphone : ${phone},  Mail : ${email}, Message : ${message}`,
  };

  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log(info);
    res.status(200).send({ message: "Mail envoyé" });
  });
};
