import fs from 'node:fs';
import path from 'node:path';

import { ListFolderByIdParams, ListFolderByIdResult } from '@/types/folder';
import Api from '@/common/Api';
import utils from '@/common/utils';
import { ApiConfigType } from '@/types';

const listById = async (
  { token, sandbox = false }: ApiConfigType,
  { folderId }: ListFolderByIdParams,
): Promise<ListFolderByIdResult | undefined> => {
  try {
    const filename = path.resolve(
      __dirname,
      '..',
      'resources',
      'folders',
      'listById.graphql',
    );
    const operations = fs
      .readFileSync(filename)
      .toString()
      .replace(/[\n\r]/gi, '')
      .replace('$folderId', folderId)
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

export { listById };
