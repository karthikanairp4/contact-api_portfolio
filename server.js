const express = require('express');
require('dotenv').config();
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// POST route for sending email
app.post('/send', async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      text: `Name: ${name}\n\nEmail: ${email}\n\n${message}`,
    });

    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (err) {
    console.error('Error sending email:', err);
    res.status(500).json({ message: 'Failed to send message.' });
  }
});

app.get('/', (req, res) => {
  res.send('API running');
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
