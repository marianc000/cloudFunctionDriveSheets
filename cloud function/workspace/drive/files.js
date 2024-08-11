// files.js
import { driveAPI } from '../service.js';
import { Readable } from 'stream';
import { getFolderInFolderWithIdCreateIfNotExist } from './folders.js';

async function createFileInFolderWithId(folderId, fileName, fileBuf, properties) {
 
  const { data } = await driveAPI.files.create({
    requestBody: {
      name: fileName,
      parents: [folderId],
      properties
    },
    media: {
      body: Readable.from(fileBuf)
    },
    fields: 'id,properties,webViewLink,name,size' 
  });
 
  return data;
}
 
export async function createFilesInFolderWithNameInFolderWithId(parentFolderId, folderName, files, properties) {
  if (!files.length) return [];

  const folderId = await getFolderInFolderWithIdCreateIfNotExist(parentFolderId, folderName);

  return Promise.all(files.map(o => createFileInFolderWithId(folderId, o.filename, o.buf, properties)  ));
}