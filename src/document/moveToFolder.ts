import fs from 'node:fs';
import path from 'node:path';

import { MoveDocumentParams, MoveDocumentsResult } from '@/types/document';
import Api from '@/common/Api';
import utils from '@/common/utils';
import { ApiConfigType } from '@/types';

const moveToFolder = async (
  { token, sandbox = false }: ApiConfigType,
  { currentFolderId, folderId, documentId }: MoveDocumentParams,
): Promise<MoveDocumentsResult | undefined> => {
  try {
    const filename = path.resolve(
      __dirname,
      '..',
      'resources',
      'folders',
      currentFolderId ? 'moveToFolderByFolder.graphql' : 'moveToFolder.graphql',
    );
    const operations = fs
      .readFileSync(filename)
      .toString()
      .replace(/[\n\r]/gi, '')
      .replace('$folderId', folderId)
      .replace('$documentId', documentId)
      .replace('$sandbox', sandbox.toString());

    if (currentFolderId) {
      operations.replace('$currentFolderId', currentFolderId);
    }

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

export { moveToFolder };
