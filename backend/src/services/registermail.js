const nodemailer = require('nodemailer')
require('dotenv').config()

// Nodemailer-Konfiguration
let transporter
try {
  if (!process.env.MAIL_HOST || !process.env.MAIL_USER || !process.env.MAIL_PASS) {
    console.warn('E-Mail-Konfiguration unvollständig! E-Mail-Funktionen deaktiviert.')
  } else {
    transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: parseInt(process.env.MAIL_PORT || '465'),
      secure: process.env.MAIL_SECURE === 'true',
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    })
  }
} catch (error) {
  console.error('Fehler bei der Konfiguration von Nodemailer:', error)
}

// Funktion zum Senden der Registrierungsbestätigungs-E-Mail
async function sendRegistrationConfirmationEmail(user) {
  // Wenn Transporter nicht konfiguriert wurde, still beenden
  if (!transporter) {
    console.warn('E-Mail kann nicht gesendet werden: Transporter nicht konfiguriert')
    return
  }

  try {
    const mailOptions = {
      from: `"At the Movies" <${process.env.MAIL_FROM || process.env.MAIL_USER}>`,
      to: user.email,
      subject: 'Willkommen bei At the Movies!',
      html: `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee;">
            <h1 style="color: #333;">Willkommen bei At the Movies, ${user.firstName}!</h1>
            <p>Vielen Dank für Ihre Registrierung. Wir freuen uns, Sie in unserer Community begrüßen zu dürfen!</p>
            <p>Mit Ihrem Konto können Sie:</p>
            <ul>
              <li>Filme zu Ihrer Watchlist hinzufügen</li>
              <li>Filme bewerten und Rezensionen schreiben</li>
              <li>Filme, die Sie bereits gesehen haben, in Ihrer Watched-Liste speichern!</li>
            </ul>
            <p>Ihre Anmeldedaten:</p>
            <p><strong>E-Mail:</strong> ${user.email}</p>
            <hr style="border: 0; border-top: 1px solid #eee; margin: 20px 0;">
            <p>Viel Spaß beim Entdecken neuer Filme!</p>
            <p>Mit freundlichen Grüßen,<br>Ihr At the Movies Team</p>
          </div>
        `,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Registrierungs-E-Mail gesendet:', info.messageId)
    return info
  } catch (error) {
    console.error('Fehler beim Senden der Registrierungs-E-Mail:', error)
    throw error // Optional: Fehler weiterleiten
  }
}

module.exports = {
  sendRegistrationConfirmationEmail,
}
