import nodemailer from "nodemailer";


export const transporter = nodemailer.createTransport({
  host: "smtp.ethereal.email",
  port: 587,
  auth: {
    user: "hudson.collins@ethereal.email",
    pass: "CP3aKGQzse4jJpQGXE",
  },
});

transporter
  .verify()
  .then(() => {
    console.log("Puede enviar correos electronicos");
  })
  .catch((error) => {
    console.log("Error al enviar correos", error);
  });
