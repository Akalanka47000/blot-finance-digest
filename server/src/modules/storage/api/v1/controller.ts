import express, { Response } from 'express';
import { default as fileUpload, UploadedFile } from 'express-fileupload';
import { tracedAsyncHandler } from '@sliit-foss/functions';
import createError from 'http-errors';
import { protect, toSuccess } from '@/middleware';
import * as service from './service';

const storage = express.Router();

storage.post(
  '/',
  protect,
  fileUpload(),
  tracedAsyncHandler(async function uploadFiles(req: any, res: Response) {
    if (!req.files) throw createError(400, 'Please provide a file to upload');
    const files = Object.values(req.files).reduce((acc: UploadedFile[], file: UploadedFile | UploadedFile[]) => {
      if (Array.isArray(file)) return [...acc, ...file];
      return [...acc, file];
    }, []) as UploadedFile[];
    const url = await service.uploadFile(files[0]);
    return toSuccess({ res, data: { url }, message: 'File uploaded successfully!' });
  })
);

export default storage;
