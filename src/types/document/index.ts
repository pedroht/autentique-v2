export type DocumentType = {
  id: string;
  name: string;
  refusable: boolean;
  sortable: boolean;
  created_at: string;
  signatures: SignatureType[];
  files: {
    original: string;
    signed: string;
  };
};

type Event = {
  ipv4: string;
  ipv6: string;
  reason: string;
  created_at: string;
  geolocation: {
    country: string;
    countryISO: string;
    state: string;
    stateISO: string;
    city: string;
    zipcode: string;
    latitude: string;
    longitude: string;
  };
};

export type SignatureType = {
  public_id: string;
  name: null;
  email: string;
  created_at: string;
  action: {
    name: string;
  };
  link: {
    short_link: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
  viewed: Event;
  signed: Event;
  rejected: Event;
};

export type CreateDocumentParams = {
  document: {
    name: string;
  };
  signers: {
    email: string;
    action: 'SIGN';
    positions?: {
      x: string;
      y: string;
      z: string;
    }[];
  }[];
  file: null | File | string;
};

export type CreateDocumentResult = {
  data: {
    createDocument: Omit<DocumentType, 'files'>;
  };
};

export type DeleteDocumentParams = {
  documentId: string;
};

export type DeleteDocumentResult = {
  data: {
    createDocument: Omit<DocumentType, 'files'>;
  };
};

export type ListAllDocumentsParams = {
  page?: number;
};

export type ListAllDocumentsResult = {
  data: {
    documents: {
      total: null | number;
      data: DocumentType[];
    };
  };
};

export type ListDocumentByIdParams = {
  documentId: string;
};

export type ListDocumentByIdResult = {
  data: {
    document: DocumentType;
  };
};

export type SignDocumentParams = {
  documentId: string;
};

export type SignDocumentResult = {
  data: DocumentType;
};

export type MoveDocumentParams = {
  currentFolderId?: string;
  folderId: string;
  documentId: string;
};

export type MoveDocumentsResult = {
  data: DocumentType;
};
