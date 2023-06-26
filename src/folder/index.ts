import {
  CreateFolderParams,
  DeleteFolderParams,
  ListAllFoldersParams,
  ListDocumentsByFolderParams,
  ListFolderByIdParams,
} from '@/types/folder';
import { ApiConfigType } from '@/types';

import { create } from './create';
import { deleteById } from './deleteById';
import { listAll } from './listAll';
import { listById } from './listById';
import { listDocuments } from './listDocuments';

const folder = (def: ApiConfigType) => ({
  create: (args: CreateFolderParams) => create(def, args),
  listAll: (args: ListAllFoldersParams) => listAll(def, args),
  listById: (args: ListFolderByIdParams) => listById(def, args),
  listDocuments: (args: ListDocumentsByFolderParams) =>
    listDocuments(def, args),
  deleteById: (args: DeleteFolderParams) => deleteById(def, args),
});

export default folder;
