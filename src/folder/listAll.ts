import fs from 'node:fs';
import path from 'node:path';

import Api from '../common/Api';
import utils from '../common/utils';
import { ApiConfigType } from '../types';
import { ListAllFoldersParams, ListAllFoldersResult } from '../types/folder';

const listAll = async (
  { token, sandbox = false }: ApiConfigType,
  { page = 1 }: ListAllFoldersParams,
): Promise<ListAllFoldersResult | undefined> => {
  try {
    const filename = path.resolve(
      __dirname,
      '..',
      'resources',
      'folders',
      'listAll.graphql',
    );
    const operations = fs
      .readFileSync(filename)
      .toString()
      .replace(/[\n\r]/gi, '')
      .replace('$page', page.toString())
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

export { listAll };
