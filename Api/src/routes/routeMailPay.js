const { Router } = require("express");
const mailerRoutesPay = Router();


const sendMailerPay = require("../mails/sendMailerPay");


//Rutas
mailerRoutesPay.post("/", async (req, res) => {
    try {
        const data = req.body;
        const mailPost = await sendMailerPay(data);
        res.status(201).json(mailPost);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Exportación
module.exports = mailerRoutesPay;