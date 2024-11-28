"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import useUploadImage from "../hooks/useUploadImage";
import { Alert, ProgressBar } from "react-bootstrap";
import { UploadImageProps } from "@/types/upload.types";

const UploadImage: React.FC<UploadImageProps> = ({ onUpload }) => {
  const uploadImage = useUploadImage();
  const [generalError, setGeneralError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (!acceptedFiles.length) {
        setGeneralError("Varning ⚠ Filen avvisad!");
        return;
      }
      uploadImage.upload(acceptedFiles[0]);
      onUpload(acceptedFiles[0]);
    },
    [uploadImage, onUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "image/gif": [],
      "image/jpeg": [],
      "image/png": [],
      "image/webp": [],
    },
    maxFiles: 1,
    maxSize: 4 * 1024 * 1024, // 4 MB
    onDrop,
  });

  return (
    <div className="container d-flex justify-content-center align-items-center">
      <div {...getRootProps()} id="dropzone-wrapper">
        <input {...getInputProps()} />
        <div id="indicator">
          {isDragActive ? (
            <p>Släpp din fil här...</p>
          ) : (
            <p className="text-white">
              Klicka här eller dra & släpp för att ladda upp din bild
            </p>
          )}
        </div>
        {uploadImage.progress !== null && (
          <ProgressBar
            animated
            label={`${uploadImage.progress}%`}
            now={uploadImage.progress}
            variant="success"
          />
        )}

        {typeof generalError === "string" && (
          <Alert variant="warning">{generalError}</Alert>
        )}

        {uploadImage.isError && (
          <Alert variant="danger">{uploadImage.error}</Alert>
        )}
        {uploadImage.isSuccess && (
          <Alert variant="success">Din uppladdning lyckades</Alert>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
