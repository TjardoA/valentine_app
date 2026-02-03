import nodemailer from "nodemailer";

// Single transporter reused for all emails.
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export function sendInvite({ senderName, senderEmail, receiverName, receiverEmail, link }) {
  return transporter.sendMail({
    from: `"${senderName}" <${senderEmail}>`,
    to: receiverEmail,
    subject: `A valentine for you from ${senderName}!`,
    html: `
      <p>Hi ${receiverName} 💌</p>
      <p>${senderName} sent you a Valentine.</p>
      <p><a href="${link}">${link}</a></p>
    `,
  });
}

export function sendYesNotice({ senderName, senderEmail, receiverName, timestamp }) {
  return transporter.sendMail({
    from: `"Valentine Bot" <${process.env.SMTP_USER}>`,
    to: senderEmail,
    subject: `${receiverName} said YES!`,
    html: `
      <p>${receiverName} clicked YES on ${timestamp}.</p>
      <p>Love is in the air! 💖</p>
    `,
  });
}
