import * as sharp from 'sharp';
import * as mkdirp from 'mkdirp';

export const SaveImage = async (file: Express.Multer.File) => {
  const destination = 'files/';
  const fileName = new Date().toISOString() + '-' + file.originalname;
  mkdirp.sync(destination);
  await sharp(file.buffer).toFile(destination + fileName);
};
