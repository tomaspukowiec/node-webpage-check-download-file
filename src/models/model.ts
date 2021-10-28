export interface Config {
  url: Url;
  mailer: Mailer;
}

export interface Url {
  link: string;
  anchorSelector: string;
  anchorText: string;
}

export interface Mailer {
  host: string;
  port: string;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
  mailOptions: {
    to: string;
    subject: string;
    text?: string;
    html?: string;
  };
  admin?: string;
}
