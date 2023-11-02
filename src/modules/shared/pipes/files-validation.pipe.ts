import { BadRequestException, PipeTransform } from '@nestjs/common';

export class FilesValidationPipe implements PipeTransform {
  allowEmpty: boolean = false;
  constructor(options: { allowEmpty: boolean }) {
    this.allowEmpty = options.allowEmpty;
  }
  transform(files: Express.Multer.File[]) {
    if ((!this.allowEmpty && files?.length <= 0) || !files) throw new BadRequestException('Files cannot be empty');

    files?.forEach((file) => {
      if (file.mimetype !== 'application/pdf') {
        throw new BadRequestException('Invalid file type (expected file pdf)');
      }

      // Check the file size
      if (file.size > 10 * 1024 * 1024) {
        // 10 MB
        throw new BadRequestException('File is too large');
      }
    });

    return files;
  }
}
