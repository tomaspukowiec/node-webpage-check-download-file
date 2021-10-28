import { Mailer } from '../models/model';
import { isEmpty, log } from '../utils/util';
import { FILE_LOG_ERROR, FILE_LOG_INFO } from '../models/const';

const nodemailer = require('nodemailer');

const validateMailData = async (mailData: Mailer) => {
  if (
    isEmpty(mailData.host) ||
    isEmpty(mailData.port) ||
    isEmpty(mailData.auth.user) ||
    isEmpty(mailData.auth.pass) ||
    isEmpty(mailData.mailOptions.to) ||
    isEmpty(mailData.mailOptions.subject) ||
    isEmpty(mailData.mailOptions.html)
  ) {
    throw new Error('Mail configuration is missing');
  }
};

const sendEmail = async (mailerData: Mailer) => {
  await validateMailData(mailerData);
  const transporter = nodemailer.createTransport({
    host: mailerData.host,
    port: mailerData.port,
    secure: mailerData.secure,
    auth: {
      user: mailerData.auth.user,
      pass: mailerData.auth.pass,
    },
  });

  await transporter.sendMail(
    {
      from: mailerData.auth.user,
      to: mailerData.mailOptions.to,
      subject: mailerData.mailOptions.subject,
      text: mailerData.mailOptions.text,
      html: mailerData.mailOptions.html,
    },
    (error: any, info: any) => {
      if (error) {
        log(FILE_LOG_ERROR, error).then();
      } else {
        log(FILE_LOG_INFO, `Message sent: ${info.response}`).then();
      }
      transporter.close();
    }
  );
  await transporter.close();
};

export default sendEmail;
