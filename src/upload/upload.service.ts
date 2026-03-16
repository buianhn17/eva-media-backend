import { Injectable } from '@nestjs/common'
import { v2 as cloudinary } from 'cloudinary'
import { Readable } from 'stream'

@Injectable()
export class UploadService {

  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    
  }

  async uploadImage(file: Express.Multer.File) {

    return new Promise((resolve, reject) => {

      const upload = cloudinary.uploader.upload_stream(
        { folder: 'media-blog' },
        (error, result) => {
          if (error) return reject(error)

          resolve({
            url: result?.secure_url
          })
        }
      )

      const bufferStream = new Readable()
      bufferStream.push(file.buffer)
      bufferStream.push(null)
      bufferStream.pipe(upload)

    })

  }

}