const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/send-email', (req, res) => {
    const { name, email, phone, message } = req.body;

    // Configurar el transporte de Nodemailer
    let transporter = nodemailer.createTransport({
        service: 'gmail', // Puedes usar otros servicios como Outlook, Yahoo, etc.
        auth: {
            user: 'javierroviramoreno@gmail.com', // Tu correo
            pass: 'tu-contraseña' // Tu contraseña
        }
    });

    // Configurar el correo
    let mailOptions = {
        from: email,
        to: 'tu-email@gmail.com',
        subject: 'Nuevo mensaje del formulario de contacto',
        text: `Nombre: ${name}\nEmail: ${email}\nTeléfono: ${phone}\nMensaje: ${message}`
    };

    // Enviar el correo
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send('Error al enviar el correo');
        }
        res.status(200).send('Correo enviado con éxito');
    });
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});
