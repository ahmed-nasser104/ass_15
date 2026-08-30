import nodemailer from "nodemailer";
import { env } from "../../config/env.service";
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: env.user_email,
    pass: env.user_password,
  },
});

export const sendMail = async ({
  to,
  subject,
  html,
}: {
  to: string;
  subject: string;
  html: string;
}) => {
  const info = await transporter.sendMail({
    from: env.user_email,
    to,
    subject,
    html,
  });

  return info;
};
