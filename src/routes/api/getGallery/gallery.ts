import { GDRIVE_GALLERY_API_KEY , GDRIVE_GALLERY_FOLDER_ID_HOME, GDRIVE_GALLERY_FOLDER_ID_OSS,GDRIVE_GALLERY_FOLDER_ID_GENERAL, GDRIVE_GALLERY_FOLDER_ID_GAME_DEV, GDRIVE_GALLERY_FOLDER_ID_DEV, GDRIVE_GALLERY_FOLDER_ID_DESIGN, GDRIVE_GALLERY_FOLDER_ID_ALGO, GDRIVE_GALLERY_FOLDER_ID_AI, GDRIVE_GALLERY_FOLDER_ID_ICPC} from '$lib/env';
import type { Gallery, GalleryItem } from '$lib/public/gallery';
import { getDrive, listFiles } from '../getDrive/drive'


export async function getGallery(folderName:string): Promise<Gallery> {
  const drive = getDrive(GDRIVE_GALLERY_API_KEY);


  const folderIdMap: Record<string, string | undefined> = {
    home: GDRIVE_GALLERY_FOLDER_ID_HOME,
    oss: GDRIVE_GALLERY_FOLDER_ID_OSS,
    general: GDRIVE_GALLERY_FOLDER_ID_GENERAL,
    game_dev: GDRIVE_GALLERY_FOLDER_ID_GAME_DEV,
    dev: GDRIVE_GALLERY_FOLDER_ID_DEV,
    design: GDRIVE_GALLERY_FOLDER_ID_DESIGN,
    algo: GDRIVE_GALLERY_FOLDER_ID_ALGO,
    ai: GDRIVE_GALLERY_FOLDER_ID_AI,
    icpc: GDRIVE_GALLERY_FOLDER_ID_ICPC
  };

  const folderId = folderIdMap[folderName];

  if (!folderId) {
    throw new Error(`Folder ID for "${folderName}" not found`);
  }

  const files = await listFiles(drive, folderId);

  
  return files
    .filter((file) => file.mimeType?.startsWith('image/'))
    .map(
      (file): GalleryItem => ({
        id: String(file.id),
        webContentLink: String(file.webContentLink),
        mimeType: String(file.mimeType),
        name: String(file.name),
      })
    );
}