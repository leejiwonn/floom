import type { S3 } from 'aws-sdk';
import { Request, Response } from 'express';
import mime from 'mime-types';
import { nanoid } from 'nanoid';
import nc from 'next-connect';
import { authorize } from '~/server/auth';
import { s3 } from '~/server/aws';
import { PreUploadRequestData, PreUploadResponseData } from '~/types/common';

const ALLOWED_MIME_TYPES = {
  image: ['image/png', 'image/jpg', 'image/jpeg'],
  video: ['video/mp4', 'video/webm'],
};
const MAX_FILE_SIZE = 10_485_760; // 10MB

type MimeTypeInfo = {
  type: 'image' | 'video';
  filename: string;
  mimeType: string;
};

const parseMimeTypeInfo = (
  filename: string,
  contentType?: string,
): MimeTypeInfo | null => {
  const mimeType = mime.lookup(filename) || contentType;

  if (mimeType == null) {
    return null;
  }

  if (ALLOWED_MIME_TYPES.image.includes(mimeType)) {
    return {
      type: 'image',
      filename,
      mimeType,
    };
  }

  if (ALLOWED_MIME_TYPES.video.includes(mimeType)) {
    return {
      type: 'video',
      filename,
      mimeType,
    };
  }

  return null;
};

const getExtension = (mimeType: string) => {
  const extension = mime.extension(mimeType);

  return extension === false ? null : extension;
};

const createUniqueKey = ({ mimeType }: MimeTypeInfo) => {
  const key = nanoid();
  const ext = getExtension(mimeType);

  return ext == null ? key : `${key}.${ext}`;
};

async function preUpload(req: Request, res: Response) {
  const { filename, contentType } = req.body as PreUploadRequestData;
  const mimeTypeInfo = parseMimeTypeInfo(filename, contentType);

  if (mimeTypeInfo == null) {
    res.status(400).send({
      message: '업로드할 수 없는 파일 형식이에요',
    });
    return;
  }

  const key = createUniqueKey(mimeTypeInfo);
  const conditions: S3.PresignedPost.Params['Conditions'] = [
    mimeTypeInfo.type === 'image'
      ? ['starts-with', '$Content-Type', 'image/']
      : ['starts-with', '$Content-Type', 'video/'],
    ['content-length-range', 0, MAX_FILE_SIZE],
  ];

  const result = await s3.createPresignedPost({
    Bucket: 'floom-upload',
    Fields: { key },
    Expires: 300,
    Conditions: conditions,
  });

  const response: PreUploadResponseData = {
    key,
    url: `https://d2wa8r8zsrxntp.cloudfront.net/${key}`,
    requestUrl: result.url,
    requestFields: result.fields,
  };

  res.status(201).send(response);
}

const handler = nc<Request, Response>().use(authorize).post(preUpload);

export default handler;
