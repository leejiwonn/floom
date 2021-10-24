/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { S3 } from 'aws-sdk';

export const s3 = new S3({
  credentials: {
    accessKeyId: process.env.S3_AWS_ACCESS_KEY!,
    secretAccessKey: process.env.S3_AWS_SECRET_ACCESS_KEY!,
  },
  region: 'ap-northeast-2',
});
