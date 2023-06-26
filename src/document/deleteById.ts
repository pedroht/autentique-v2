import fs from 'node:fs';
import path from 'node:path';

import Api from '../common/Api';
import utils from '../common/utils';
import { ApiConfigType } from '../types';
import { DeleteDocumentParams, DeleteDocumentResult } from '../types/document';

const deleteById = async (
  { token, sandbox = false }: ApiConfigType,
  { documentId }: DeleteDocumentParams,
): Promise<DeleteDocumentResult | undefined> => {
  try {
    const filename = path.resolve(
      __dirname,
      '..',
      'resources',
      'documents',
      'deleteById.graphql',
    );
    const operations = fs
      .readFileSync(filename)
      .toString()
      .replace(/[\n\r]/gi, '')
      .replace('$documentId', documentId)
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

export { deleteById };
