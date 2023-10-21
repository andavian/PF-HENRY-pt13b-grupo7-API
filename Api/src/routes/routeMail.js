// Ruta para uso de Nodemailer
const { Router } = require("express");
const mailerRoutes = Router();


const sendMailer = require("../mails/sendMailer");


//Rutas
mailerRoutes.post("/", async (req, res) => {
    try {
        const data = req.body;
        const mailPost = await sendMailer(data);
        res.status(201).json(mailPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Exportación
module.exports = mailerRoutes;