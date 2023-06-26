import { DocumentType, SignatureType } from '../document';

type FolderType = {
  id: string;
  name: string;
  type: string;
  created_at: string;
};

export type CreateFolderParams = {
  folder: {
    name: string;
  };
};

export type CreateFolderResult = {
  data: {
    createFolder: FolderType;
  };
};

export type DeleteFolderParams = {
  folderId: string;
};

export type DeleteFolderResult = {
  data: {};
};

export type ListAllFoldersParams = {
  page?: number;
};

export type ListAllFoldersResult = {
  data: {
    folders: {
      total: null | number;
      data: FolderType[];
    };
  };
};

export type ListFolderByIdParams = {
  folderId: string;
};

export type ListFolderByIdResult = {
  data: {
    folder: FolderType;
  };
};

export type ListDocumentsByFolderParams = {
  folderId: string;
};

export type ListDocumentsByFolderResult = {
  data: {
    total: number | null;
    data: Omit<DocumentType, 'refusable' | 'sortable'> &
      { signatures: Omit<SignatureType, 'created_at' | 'link' | 'user'> }[];
  };
};
