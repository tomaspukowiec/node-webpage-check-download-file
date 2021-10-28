import fs from 'fs';
import { FILE_CONFIG } from '../models/const';
import { Config } from '../models/model';
import { isEmpty } from '../utils/util';

const validateFields = async (configFile: Config) => {
  if (
    !configFile ||
    isEmpty(configFile.url) ||
    isEmpty(configFile.url.link) ||
    isEmpty(configFile.url.anchorSelector) ||
    isEmpty(configFile.url.anchorText)
  ) {
    throw new Error('-> Missing url configuration');
  }
  if (isEmpty(configFile.mailer)) {
    throw new Error('-> Missing mailer configuration');
  }
};

const getConfigJSON = async () => {
  if (!fs.existsSync(FILE_CONFIG)) {
    throw new Error(`${FILE_CONFIG} file does not exist!`);
  }
  try {
    const configFile: Config = JSON.parse(
      fs.readFileSync(FILE_CONFIG, 'utf-8')
    );
    await validateFields(configFile);
    return configFile;
  } catch (e) {
    throw new Error(`Error when parsing ${FILE_CONFIG} file!\n${e}`);
  }
};

export default getConfigJSON;
