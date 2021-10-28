import fs from 'fs';

import Downloader from 'nodejs-file-downloader';

import {
  FILE_EXTENSION,
  FILE_LOG_INFO,
  FILE_NAME_ACTUAL,
  FILE_NAME_NEW,
  FILE_PATH,
} from '../models/const';
import { currentDate, log } from '../utils/util';
import sendEmail from './mail';
import { Config } from '../models/model';

const informUser = async (urlFile: string, config: Config) => {
  const mailerData = config.mailer;
  let html = `<h1>${config.mailer.mailOptions.subject}</h1>`;
  html += `<a href='${urlFile}' title='${config.mailer.mailOptions.subject}'>-> Odkaz na jídelníček <-</a><br><br>`;
  mailerData.mailOptions.html = html;

  await sendEmail(mailerData);
};

const downloadFileAndHandle = async (urlFile: string, config: Config) => {
  const fileNew = FILE_PATH + FILE_NAME_NEW;
  const fileActual = FILE_PATH + FILE_NAME_ACTUAL;
  const downloader = new Downloader({
    url: urlFile,
    directory: FILE_PATH,
    fileName: FILE_NAME_NEW,
    cloneFiles: false,
  });

  try {
    await downloader.download();
    if (!fs.existsSync(fileActual)) {
      fs.renameSync(fileNew, fileActual);
      await informUser(urlFile, config);
    } else {
      const statsFileActual = fs.statSync(fileActual);
      const statsFileNew = fs.statSync(fileNew);
      if (statsFileActual.size !== statsFileNew.size) {
        log(FILE_LOG_INFO, 'File updated. Handle it...').then();
        fs.renameSync(
          fileActual,
          `${FILE_PATH}old-${currentDate()}${FILE_EXTENSION}`
        );
        fs.renameSync(fileNew, fileActual);
        await informUser(urlFile, config);
      } else {
        log(FILE_LOG_INFO, 'File still the same').then();
      }
    }
  } catch (error: any) {
    throw new Error(error);
  }
};

export default downloadFileAndHandle;
