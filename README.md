#### AUTENTIQUE Api v2

# 🚀 Como usar

## This package is so simple to use that it will save your time.

`npm i autentique-v2`

**Set file .env**

```env
AUTENTIQUE_URL=https://api.autentique.com.br/v2
AUTENTIQUE_TOKEN="YOUR_TOKEN"
AUTENTIQUE_DEV_MODE="true" || "false"
# if TRUE, document will be created in mode sandbox
```

## Summary

1. [Instance](#instance)
2. [Documents](#documents)
3. [Folders](#folders)

<h2 id="instance">1. Instance</h2>

**Import library**

```js script
import autentique from 'autentique-v2';

autentique.token = AUTENTIQUE_TOKEN;
```

<h2 id="documents">📝 2. Documents</h2>

#### 1 - List all documents with pagination

```js script
autentique.document.listAll({ page }); // if not isset page is equal 1
```

#### 2 - List the document by id

```js script
autentique.document.listById({ documentId });
```

#### 3 - Create a document

```js script
const attributes = {
  document: {
    name: 'NOME DO DOCUMENTO',
  },
  signers: [
    {
      email: 'email@email.com',
      action: 'SIGN',
      positions: [
        {
          x: '50', // Posição do Eixo X da ASSINATURA (0 a 100)
          y: '80', // Posição do Eixo Y da ASSINATURA (0 a 100)
          z: '1', // Página da ASSINATURA
        },
        {
          x: '50', // Posição do Eixo X da ASSINATURA (0 a 100)
          y: '50', // Posição do Eixo Y da ASSINATURA (0 a 100)
          z: '2', // Página da ASSINATURA
        },
      ],
    },
    {
      email: 'email@email.com',
      action: 'SIGN',
    },
  ],
  file: 'https://www.documento.com.br/arquivo.pdf',
};

autentique.document.create(attributes);
```

### 4 - Sign the document by id

```js script
autentique.document.signById({ documentId });
```

#### 5 - Delete the document by id

```js script
autentique.document.deleteById({ documentId });
```

#### 6 - Move the document to a folder

```js script
autentique.document.moveToFolder({
  documentId,
  folderId,
});
```

#### 7 - Move the document from current folder to target folder

```js script
autentique.document.moveToFolder({
  documentId,
  folderId,
  currentFolderId,
});
```

---

<h2 id="folders">📁 3. Folders</h2>

#### 1 - List all folders

```js script
autentique.folder.listAll({ page }); // if not isset page is equal 1
```

#### 2 - List the folder by id

```js script
autentique.folder.listById({ folderId });
```

#### 3 - Create a folder

```js script
autentique.folder.create({ name });
```

#### 4 - List the folder contents by id

js script

```
autentique.folder.listDocuments({ folderId })
```

#### 5 - Delete a folder

```js script
autentique.folder.deleteById({ folderId });
```
