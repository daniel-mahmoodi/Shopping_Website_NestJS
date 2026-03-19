import * as sharp from 'sharp';
import * as mkdirp from 'mkdirp';
import { UploadFileDto } from '../dtos/upload-file.dto';

export const SaveImage = async (
  file: Express.Multer.File,
  body: UploadFileDto,
) => {
  const destination = 'files/' + body.folder;
  const fileName = new Date().toISOString() + '-' + file.originalname;
  mkdirp.sync(destination);
  await sharp(file.buffer).toFile(destination + '/' + fileName);
  return fileName;
};
