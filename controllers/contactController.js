const Contact = require('../models/Contact');
const nodemailer = require('nodemailer');

const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Name, email, and message are required.' });
    }

    const contact = await Contact.create({ name, email, phone, subject, message });

    // Optional email notification
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          service: 'gmail',
          auth: { user: process.env.EMAIL_USER, pass: process.env.EMAIL_PASS },
        });
        await transporter.sendMail({
          from: process.env.EMAIL_USER,
          to: process.env.EMAIL_USER,
          subject: `✨ New Inquiry: ${subject || 'Mediglow Website'} from ${name}`,
          html: `
            <div style="font-family: sans-serif; padding: 20px; border: 1px solid #eee; border-radius: 10px; max-width: 600px; margin: auto;">
              <div style="text-align: center; margin-bottom: 30px;">
                <!-- Once deployed, replace this with your public logo URL -->
                <h1 style="color: #1a8fb5; margin: 0; font-size: 24px;">THE WAVE</h1>
                <p style="color: #64748b; font-size: 12px; margin-top: 5px; letter-spacing: 2px;">GLOW WITH FLOW</p>
              </div>
              <h2 style="color: #1a8fb5; border-bottom: 2px solid #f1f5f9; padding-bottom: 10px;">New Message Received</h2>
              <p><strong>Name:</strong> ${name}</p>
              <p><strong>Email:</strong> ${email}</p>
              <p><strong>Phone:</strong> ${phone || 'Not Provided'}</p>
              <p><strong>Subject:</strong> ${subject || 'General Inquiry'}</p>
              <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
              <p><strong>Message:</strong></p>
              <p style="white-space: pre-wrap; background: #f9f9f9; padding: 15px; border-radius: 5px; border-left: 4px solid #1a8fb5;">${message}</p>
            </div>
          `,
        });
      } catch (mailErr) {
        console.log('Mail not sent:', mailErr.message);
      }
    }

    res.status(201).json({ success: true, message: 'Thank you! We will get back to you soon.', data: contact });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json({ success: true, data: contacts });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

module.exports = { submitContact, getContacts };
