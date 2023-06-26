import { ApiConfigType } from '../types';
import { CreateDocumentParams, MoveDocumentParams } from '../types/document';
import { create } from './create';
import { deleteById } from './deleteById';
import { listAll } from './listAll';
import { listById } from './listById';
import { moveToFolder } from './moveToFolder';
import { signById } from './signById';

const document = (def: ApiConfigType) => ({
  create: (args: CreateDocumentParams) => create(def, args),
  listAll: (page?: number) => listAll(def, { page }),
  listById: (documentId: string) => listById(def, { documentId }),
  deleteById: (documentId: string) => deleteById(def, { documentId }),
  signById: (documentId: string) => signById(def, { documentId }),
  moveToFolder: (args: MoveDocumentParams) => moveToFolder(def, args),
});

export default document;
