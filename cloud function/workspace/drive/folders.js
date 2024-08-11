// folders.js
import { driveAPI } from '../service.js';

async function findFolderByNameInFolderWithId(parentFolderId, folderName) {
  const { data } = await driveAPI.files.list({
    q: `'${parentFolderId}' in parents and mimeType = 'application/vnd.google-apps.folder' and name = '${folderName}' and trashed=false`,
    fields: 'files(id, name,createdTime)',
    spaces: 'drive',
    pageSize: 5,
    orderBy: 'createdTime'
  });
 
  return data.files?.[0]?.id;
}

async function createFolderInFolderWithId(parentFolderId, folderName) {
  const { data } = await driveAPI.files.create({
    requestBody: {
      name: folderName,
      mimeType: 'application/vnd.google-apps.folder',
      parents: [parentFolderId]
    },
    fields: 'id',
  });
 
  return data.id;
}

export async function getFolderInFolderWithIdCreateIfNotExist(parentFolderId, folderName) {
  let folderId = await findFolderByNameInFolderWithId(parentFolderId, folderName);
 
  if (!folderId) {
    folderId = await createFolderInFolderWithId(parentFolderId, folderName);
  }

  return folderId;
} 