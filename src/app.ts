import puppeteer from 'puppeteer';
import cheerio from 'cheerio';

import { FILE_LOG_ERROR, PUPPETEER_OPTIONS } from './models/const';
import getConfigJSON from './modules/config';
import { Config } from './models/model';
import downloadFileAndHandle from './modules/download-file-and-handle';
import { log } from './utils/util';

const run = async () => {
  const browser = await puppeteer.launch(PUPPETEER_OPTIONS);
  try {
    const config: Config = await getConfigJSON();
    const { url } = config;
    const urlDomain = `${new URL(url.link).protocol}//${
      new URL(url.link).hostname
    }`;

    const page = await browser.newPage();
    await page.goto(url.link, { waitUntil: 'networkidle0' });

    const html = await page.content();
    const $ = cheerio.load(html);
    const anchorElements = $(url.anchorSelector);
    let urlFile = '';
    anchorElements.each((index: any, el: any) => {
      const anchorText = $(el).text();
      const anchorHref = $(el).attr('href');
      if (anchorText && anchorText.includes(url.anchorText) && anchorHref) {
        urlFile = (anchorHref.startsWith('/') ? urlDomain : '') + anchorHref;
      }
    });

    await downloadFileAndHandle(urlFile, config);
  } catch (e: any) {
    log(FILE_LOG_ERROR, e).then();
  } finally {
    await browser.close();
  }
};

run().then();
