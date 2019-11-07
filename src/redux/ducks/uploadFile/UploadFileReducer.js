/**
 * Auth User Reducers
 */
import { NotificationManager } from "react-notifications";
import {
  UPLOAD_FILE,
  UPLOAD_FILE_SUCCESS,
  UPLOAD_FILE_FAILURE
} from "./UploadFileTypes";

/**
 * initial auth user
 */
const INIT_STATE = {
  loading: false,
  uploading: false
};

export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPLOAD_FILE:
      return { ...state };

    case UPLOAD_FILE_SUCCESS:
      NotificationManager.success("File uploaded successfully");
      return { ...state };

    case UPLOAD_FILE_FAILURE:
      NotificationManager.error("Unable to upload file");
      return { ...state };

    default:
      return { ...state };
  }
};
