const nodemailer = require('nodemailer');

const sendEmail = async ({ to, subject, text }) => {
  // Configuration du transporteur (ici Gmail comme exemple)
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.MAIL_USER,      // exemple : tonemail@gmail.com
      pass: process.env.MAIL_PASS       // ton mot de passe ou mot de passe d'application
    }
  });

  // Options de l'e-mail
  const mailOptions = {
    from: process.env.MAIL_USER,
    to,
    subject,
    text
  };

  // Envoi du mail
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
