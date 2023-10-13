import React, { useState } from 'react';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase'; // Adjust the import path

const DressUpload = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = () => {
    if (selectedFile) {
      const storageRef = ref(storage, `Bridal-Dresses/${selectedFile.name}`);
      const uploadTask = uploadBytesResumable(storageRef, selectedFile);

      uploadTask.on('state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setUploadProgress(progress);
        },
        (error) => {
          console.error(error);
        },
        () => {
          // Upload completed
          console.log('File uploaded successfully');
          getDownloadURL(uploadTask.snapshot.ref)
            .then((downloadURL) => {
              console.log('Download URL:', downloadURL);
            });
        }
      );
    }
  };

  return (
    <div>
      <h2>Dresses Uploader</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
      <progress value={uploadProgress} max="100" />
    </div>
  );
};

export default DressUpload;
