import fs from 'node:fs';
import path from 'node:path';

import { CreateFolderParams, CreateFolderResult } from '@/types/folder';
import Api from '@/common/Api';
import utils from '@/common/utils';
import { ApiConfigType } from '@/types';

const create = async (
  { token, sandbox = false }: ApiConfigType,
  { name }: CreateFolderParams,
): Promise<CreateFolderResult | undefined> => {
  try {
    const variables = {
      name,
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
