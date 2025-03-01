import { type UploadedFile } from 'express-fileupload';
import { uploadFile as uploadFileToS3 } from '@/integrations';

export const uploadFile = (file: UploadedFile) => {
  return uploadFileToS3(file);
};
