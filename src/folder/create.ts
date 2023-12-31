import fs from 'node:fs';
import path from 'node:path';

import Api from '../common/Api';
import utils from '../common/utils';
import { ApiConfigType } from '../types';
import { CreateFolderParams, CreateFolderResult } from '../types/folder';

const create = async (
  { token, sandbox = false }: ApiConfigType,
  { folder }: CreateFolderParams,
): Promise<CreateFolderResult | undefined> => {
  try {
    const variables = {
      folder,
    };

    const filename = path.resolve(
      __dirname,
      '..',
      'resources',
      'folders',
      'create.graphql',
    );
    const operations = fs
      .readFileSync(filename)
      .toString()
      .replace(/[\n\r]/gi, '')
      .replace('$variables', JSON.stringify(variables))
      .replace('$sandbox', sandbox.toString());

    const formData = utils.query(operations);
    const response = await Api(token).post('/graphql', formData, {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response && response.data;
  } catch (error) {
    console.log(error);
  }
};

export { create };
