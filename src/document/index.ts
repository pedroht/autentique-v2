import { ApiConfigType } from '../types';
import {
  CreateDocumentParams,
  DeleteDocumentParams,
  ListAllDocumentsParams,
  ListDocumentByIdParams,
  MoveDocumentParams,
  SignDocumentParams,
} from '../types/document';
import { create } from './create';
import { deleteById } from './deleteById';
import { listAll } from './listAll';
import { listById } from './listById';
import { moveToFolder } from './moveToFolder';
import { signById } from './signById';

const document = (def: ApiConfigType) => ({
  create: (args: CreateDocumentParams) => create(def, args),
  listAll: (args: ListAllDocumentsParams) => listAll(def, args),
  listById: (args: ListDocumentByIdParams) => listById(def, args),
  deleteById: (args: DeleteDocumentParams) => deleteById(def, args),
  signById: (args: SignDocumentParams) => signById(def, args),
  moveToFolder: (args: MoveDocumentParams) => moveToFolder(def, args),
});

export default document;
