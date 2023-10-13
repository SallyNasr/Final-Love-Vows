import React, { useState } from "react";
import { ref, uploadBytes } from "firebase/storage";
import { storage } from '../../firebase';

function uploadMultiImages() {
  const [upimages, upsetImages] = useState;

  const uploadFiles = async () => {
    for (let i = 0; i < upimages.length; i++) {
      const imageRef = ref(storage, `/mulitpleFiles/${upimages[i].name}`);

      const result = await uploadBytes(imageRef, upimages[i])
        .then(() => {
          console.log("success");
        })
        .catch((error) => {
          console.log("error");
        });
    }
  };

  console.log(upimages);

  return (
    <div className="uploadimages">
      <input
        type="file"
        multiple
        onChange={(event) => {
          upsetImages(event.target.files);
        }}
      />

      <button onClick={uploadFiles}>Submit</button>
      
    </div>
  );
}

export default uploadMultiImages;