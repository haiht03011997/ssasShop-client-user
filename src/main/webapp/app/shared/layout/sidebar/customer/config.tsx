import {
  AppstoreOutlined,
  BookOutlined,
  CloudUploadOutlined,
  PictureOutlined,
  RobotOutlined,
  SafetyCertificateOutlined,
  ToolOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { makeIcon } from 'app/shared/component/icon/makeIcon';

export const staticIconMap = {
  0: makeIcon(BookOutlined, "red"),
  1: makeIcon(RobotOutlined, "purple"),
  2: makeIcon(VideoCameraOutlined, "orange"),
  3: makeIcon(ToolOutlined, "green"),
  4: makeIcon(CloudUploadOutlined, "blue"),
  5: makeIcon(PictureOutlined, "pink"),
  6: makeIcon(SafetyCertificateOutlined, "darkred"),
  7: makeIcon(AppstoreOutlined, "gray"),
};
