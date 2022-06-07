import nodemailer from "nodemailer";

const mailHelper = async (option) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER, // generated ethereal user
      pass: process.env.SMTP_PASS, // generated ethereal password
    },
  });

  const message = {
    from: "DragonTechShop00@gmil.com", // sender address
    to: option.email, // list of receivers
    subject: option.subject, // Subject line
    text: option.message, // plain text body
    // amp: option.amp, // html body
  };

  // send mail with defined transport object
  await transporter.sendMail(message);
};

export default mailHelper;
