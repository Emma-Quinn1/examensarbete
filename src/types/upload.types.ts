export type Upload = {
  _id: string;
  uid: string;
  name: string;
  size: number;
  type: string;
  path: string;
  url: string;
};

export type UploadImageProps = {
  onUpload: (file: File) => void;
};
