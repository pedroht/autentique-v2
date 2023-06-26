import fs from 'node:fs';
import path from 'node:path';

import {
  ListAllDocumentsParams,
  ListAllDocumentsResult,
} from '@/types/document';
import Api from '@/common/Api';
import utils from '@/common/utils';
import { ApiConfigType } from '@/types';

const listAll = async (
  { token, sandbox = false }: ApiConfigType,
  { page = 1 }: ListAllDocumentsParams,
): Promise<ListAllDocumentsResult | undefined> => {
  try {
    const filename = path.resolve(
      __dirname,
      '..',
      'resources',
      'documents',
      'listAll.graphql',
    );
    const operations = fs
      .readFileSync(filename)
      .toString()
      .replace(/[\n\r]/gi, '')
      .replace('$page', page.toString())
      .replace('$sandbox', sandbox.toString());

    const formData = utils.query(operations);

    const response = await Api(token).post('graphql', formData, {
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
