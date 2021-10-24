import axios from 'axios';
import { PreUploadResponseData } from '~/types/common';
import api from '~/utils/api';

export async function upload(file: File) {
  const {
    data: { url, key, requestUrl, requestFields },
  } = await api.post<PreUploadResponseData>('/api/common/pre-upload', {
    filename: file.name,
    contentType: file.type,
  });

  const formData = new FormData();
  formData.append('Content-Type', file.type);
  Object.entries(requestFields).forEach(([k, v]) => {
    formData.append(k, v);
  });
  formData.append('file', file);

  await axios.post<void>(requestUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });

  return {
    key,
    url,
  };
}
