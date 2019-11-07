import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE
} from "./UploadFileTypes";

export const uploadFile = file => ({
  type: UPLOAD_FILE,
  payload: file
});

export const uploadFileSuccess = success => ({
  type: UPLOAD_FILE_SUCCESS,
  payload: success
});

export const uploadFileFailure = error => ({
  type: UPLOAD_FILE_FAILURE,
  payload: error
});
