import nodemailer from "nodemailer";

const service = "google";
const auth = {
  user: "narek.boshyan.dev@gmail.com",
  pass: "edcxuqjaygivfzeg",
};
const from = "narek.boshyan@gmail.com";

export const sendEmail = (sentInvitedUserFullName, to, invitationCode, workspaceName) => {
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
          <div>Hi,${sentInvitedUserFullName} has invited you to ${workspaceName} workspace. Please  <a href="http://localhost:3000/signup?invitationCode=${invitationCode}&email=${to}">click this link to go and register</a> 
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
