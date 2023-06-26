import { ApiConfigType } from '../types';
import { CreateFolderParams } from '../types/folder';
import { create } from './create';
import { deleteById } from './deleteById';
import { listAll } from './listAll';
import { listById } from './listById';
import { listDocuments } from './listDocuments';

const folder = (def: ApiConfigType) => ({
  create: (args: CreateFolderParams) => create(def, args),
  listAll: (page?: number) => listAll(def, { page }),
  listById: (folderId: string) => listById(def, { folderId }),
  listDocuments: (folderId: string) => listDocuments(def, { folderId }),
  deleteById: (folderId: string) =>
    deleteById(def, {
      folderId,
    }),
});

export default folder;
