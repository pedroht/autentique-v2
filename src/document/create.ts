import fs from 'node:fs';
import path from 'node:path';
import axios from 'axios';
import FormData from 'form-data';

import Api from '../common/Api';
import utils from '../common/utils';
import { ApiConfigType } from '../types';
import { CreateDocumentParams, CreateDocumentResult } from '../types/document';

const create = async (
  { token, sandbox = false }: ApiConfigType,
  { document, signers, file }: CreateDocumentParams,
): Promise<CreateDocumentResult | undefined> => {
  try {
    const variables: CreateDocumentParams = {
      document,
      signers,
      file: null,
    };

    const filename = path.resolve(
      __dirname,
      '..',
      'resources',
      'documents',
      'create.graphql',
    );
    const operations = fs
      .readFileSync(filename)
      .toString()
      .replace(/[\n\r]/gi, '')
      .replace('$variables', JSON.stringify(variables))
      .replace('$sandbox', sandbox.toString());

    const buffer = await axios.get(file as string, {
      responseType: 'arraybuffer',
    });

    const formData = new FormData();
    formData.append('operations', utils.query(operations));
    formData.append('map', '{"file": ["variables.file"]}');
    formData.append('file', Buffer.from(buffer.data), {
      filename: 'prescricao.pdf',
      contentType: 'application/octet-stream',
    });

    const response = await Api(token).post('graphql', formData, {
      withCredentials: true,
      timeout: 180000,
      headers: {
        ...formData.getHeaders(),
        'Content-Type': `multipart/form-data; boundary=${formData.getBoundary()}`,
        Accept: 'application/json',
      },
    });

    return response && response.data;
  } catch (error) {
    console.log(error);
  }
};

export { create };
