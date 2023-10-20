const nodemailer = require("nodemailer");
require("dotenv").config();
const { EMAIL, PASSEMAIL } = process.env;

const sendMailer = async ({ 
  to, 
  subject, 
  text,
}) => {
  if ( !to || !subject || !text) throw Error("Faltan datos");
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      auth: {
        user: EMAIL, // El email del servicio SMTP que va a utilizar (en este caso Gmail)
        pass: PASSEMAIL, // La contraseña de dicho SMTP
      },
    });

    const htmlEmail = `
      <h1>Felicidades, su compra fue exitosa</h1>
      <h2>Lista de artículos</h2>
    `;

    const mailOptions = {
      from: EMAIL, // Quien manda el email
      to, // El email de destino
      replyTo: EMAIL,
      subject, // El asunto del email
      text, // El mensaje
      html: htmlEmail, // La parte HTML del email
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error al enviar el correo" });
      }
      // console.log("Mensaje enviado: %s", info.mensaje);
      // console.log("Url del mensaje: %s", nodemailer.getTestMessageUrl(info));
      res.json({ message: "Correo enviado exitosamente" });
    });
    /*SIN IMPLEMENTAR ENVIO DE PRODUCTO EN MAIL

    let productListHthml = "";
    let totalAmount = 0;

     // Recorre cada producto en la lista de productos
     for (const product of req.body.products) {
      const { title, cant, price } = product;
      const productTotal = cant * price;

      // Agrega la información del producto al HTML del email
      productListHthml += `
        <p>Título: ${title}</p>
        <p>Cantidad: ${cant}</p>
        <p>Precio unitario: ${price}</p>
        <p>Total: ${productTotal}</p>
        <hr />
      `;

      // Actualiza el monto total acumulado
      totalAmount += productTotal;
    }
    // Agrega el monto total al HTML del email
    productListHthml += `<p>Monto total: ${totalAmount}</p>`;

    const htmlEmail = `
      <h1>Felicidades, su compra fue exitosa</h1>
      <h2>Lista de artículos</h2>
      ${productListHthml}
      <p>${req.body.mensaje}</p>
    `;

    let mailOptions = {
      from: process.env.EMAIL, // Quien manda el email
      to: req.body.email, // El email de destino
      replyTo: process.env.EMAIL,
      subject: req.body.asunto, // El asunto del email
      text: req.body.mensaje, // El mensaje
      html: htmlEmail, // La parte HTML del email
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log(err);
        return res.status(500).json({ error: "Error al enviar el correo" });
      }
      // console.log("Mensaje enviado: %s", info.mensaje);
      // console.log("Url del mensaje: %s", nodemailer.getTestMessageUrl(info));
      res.json({ message: "Correo enviado exitosamente" });
    });
    */

  } catch ({ message }) {
    res.json({ error: message });
  }
};

module.exports = sendMailer;