import fs from 'node:fs';
import path from 'node:path';

import Api from '../common/Api';
import utils from '../common/utils';
import { ApiConfigType } from '../types';
import {
  ListDocumentsByFolderParams,
  ListDocumentsByFolderResult,
} from '../types/folder';

const listDocuments = async (
  { token, sandbox = false }: ApiConfigType,
  { folderId }: ListDocumentsByFolderParams,
): Promise<ListDocumentsByFolderResult | undefined> => {
  try {
    const filename = path.resolve(
      __dirname,
      '..',
      'resources',
      'folders',
      'listDocumentsById.graphql',
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

export { listDocuments };
