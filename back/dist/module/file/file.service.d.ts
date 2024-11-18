import { UploadApiResponse } from 'cloudinary';
export declare class FileService {
    constructor();
    cloudinary(file: Express.Multer.File): Promise<UploadApiResponse>;
}
