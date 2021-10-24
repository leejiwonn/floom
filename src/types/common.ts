import type { S3 } from 'aws-sdk';

export type PreUploadRequestData = {
  filename: string;
  contentType?: string;
};

export type PreUploadResponseData = {
  key: string;
  url: string;
  requestUrl: string;
  requestFields: S3.PresignedPost.Fields;
};
