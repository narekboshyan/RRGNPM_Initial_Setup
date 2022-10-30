/* eslint-disable no-console */
import nodemailer from "nodemailer";
import "../env.js";

const service = "google";
const auth = {
  user: process.env.NODEMAILER_USER,
  pass: process.env.NODEMAILER_PASSWORD,
};
const from = process.env.NODEMAILER_FROM;

export const sendEmail = (sentInvitedUserFullName, to, workspaceName) => {
  try {
    const transporter = nodemailer.createTransport({
      service,
      auth,
      host: "smtp.gmail.com",
      secure: true,
    });

    const mailOptions = {
      from,
      to,
      subject: "Invite user to workspace Application",
      text: "TEXT",
      html: `
          <div>Hi,${sentInvitedUserFullName} has invited you to ${workspaceName} workspace. Please  <a href="${process.env.APP_FRONT_END_URL}/signin">Click this link to go to sign in page</a> 
          </div>
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log(error);
      } else {
        console.log(`Email was sent successfully:${info.response}`);
      }
    });
  } catch (error) {
    if (error.response) {
      console.error(error.response.body);
    }
  }
};
