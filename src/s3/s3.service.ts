import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';
import * as db from 'mime-db';
import * as AWS from 'aws-sdk';
import { ACL, GET_PRE_SIGNED_URL_OP } from './s3.enum';
import { GetSignedUrlParams } from './s3.interface';

const s3 = new AWS.S3({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  endpoint: process.env.S3_ENDPOINT,
  signatureVersion: process.env.SIGNATURE_VERSION,
  region: process.env.REGION,
});

@Injectable()
export class S3Service {
  async generatePresignedUrl(contentType: string) {
    const mimeTypes = db[contentType];
    if (mimeTypes === undefined) {
      throw new HttpException(
        'Unrecognized Content-Type',
        HttpStatus.BAD_REQUEST,
      );
    }
    const extension = mimeTypes.extensions[0];
    const key = `${uuidV4()}.${extension}`;
    const params: GetSignedUrlParams = {
      Bucket: process.env.MOVIE_IMAGE_BUCKET as string,
      Key: key,
      Expires: Number(process.env.S3_SIGNED_IMAGE_URL_EXPIRY),
      ACL: ACL.PUBLIC_READ,
      ContentType: contentType,
    };

    const preSignedUrl = s3.getSignedUrl(
      GET_PRE_SIGNED_URL_OP.PUT_OBJECT,
      params,
    );

    return { preSignedUrl };
  }
}
