// index.js
import { http } from '@google-cloud/functions-framework';
import { getParts } from './utils/multipart.js';
import { addCorsHeaders } from './utils/cors.js';
import { createFilesInFolderWithNameInFolderWithId } from './workspace/drive/files.js';
import { appendRows } from './workspace/sheets/appendValues.js';
import { metadata } from './utils/metadata.js';

http('run', async (req, res) => {

  addCorsHeaders(req, res);

  if (req.method === 'GET') return res.json(metadata);

  if (req.method !== 'POST') return res.sendStatus(405);

  const { fields, files } = await getParts(req);

  const { folderId, spreadsheetId, userId, ...properties } = fields;

  try {
    const filesInDrive = await createFilesInFolderWithNameInFolderWithId(folderId, userId, files, properties);
 
    const sheetsData = filesInDrive.map(o => ({ ...o,...o.properties, userId }));

    await appendRows(spreadsheetId, sheetsData);

    res.json(sheetsData);

  } catch ({ code, message }) {
    res.json({ code, message });
  }
});
