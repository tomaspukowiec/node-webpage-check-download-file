# node-webpage-download-content

Simple Node application for checking/downloading file from specific URL. Makes backup of those file and notify when file change by email.

## The idea behind the project

There is a webpage where is a link to lunch menu in the PDF file. Unfortunatelly, this file change name every week (name has no pattern, so it must be parsed from a specific page according anchor tag text)

## Example of html code which is parsed

```html

<div id="content">
    <div class="row justify-content-center dlazdice">
        <div class="nadpis">ŠKOLNÍ JÍDELNA</div>
        <div class="col-12 progalerie">
            <div class="obsah-stranka">
                <p style="text-align: center;">
                    <a href="/upload/Jidelnicek/25-_10-_-_29-_10.pdf" rel="external">Aktuální jídelníček </a>(formát PDF)
                </p>
                <p style="text-align: center;">
                    <a title="info-vyber-stravneho-2020-2021" href="/upload/Dokumenty/info-vyber-stravneho-2020-2021.pdf">Informace pro výběr stravného</a> (formát PDF)
                </p>
                <p style="text-align: center;">
                    <a href="/upload/Dokumenty/Informace_pro_rodice_-_vyuctovani_2021.pdf" rel="external">Informace pro rodiče - vyúčtování</a> (formát PDF)
                </p>
                <p style="text-align: center;">&nbsp;</p>
                <p style="text-align: left;"><strong>Výše stravného ve školní jídelně</strong></p>
                <p style="text-align: left;">Děti 3 - 6 let&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <strong>40,- Kč</strong></p>
                <p style="text-align: left;">Děti 7-mi leté&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong> 42,- Kč &nbsp;&nbsp;</strong>
                </p>
        </div>
    </div>
</div>
````

## Configuration

Requires **config.json** file in the ROOT

```abc
{
  "url": {
    "link": "https://example-domain.com/page",
    "anchorSelector": "#content .obsah-stranka a",
    "anchorText": "jídelníček"
  },
  "mailer": {
    "host": "smtp.seznam.cz",
    "port": "465",
    "secure": true,
    "auth": {
      "user": "example@domain.com",
      "pass": "MySuperSecretPassword"
    },
    "mailOptions": {
      "to": "recipient1@domain.com, recipient2@domain.com",
      "subject": "Subject for email"
    },
    "admin": "admin@domain.com"
  }
}

````

## Build & Installation

1. Fork this git-repo
2. npm install
3. npm run build
4. -> This will generate (using webpack) bundled version in the ./dist/app.bundle.js

## Deploy & Run

1. Copy/Deploy app.bunde.js to your hosting with running Node env
2. Adjust config.json based on your needs and copy it to the same location as app.bundle.js
3. node app.bundle.js
4. Make this script run (CRON JOB) every 1 hour or so
5. As default APP logs info messages to **./info.log** and error messages to **./error.log**
6. Files are stored to ./downloads folder (created if doesn`t exist)

## NPM packages used

* puppeteer (API to control Chrome or Chromium)
* cheerio (Fast, flexible & lean implementation of core jQuery designed specifically for the server.)
* nodemailer (Send e-mails) 
