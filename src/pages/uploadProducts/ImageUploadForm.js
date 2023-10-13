import { useState } from 'react';
import { db, storage } from '../../firebase';
import { doc , collection, addDoc} from 'firebase/firestore';


function ImageUploadForm() {
  const [image, setImage] = useState(null);
  const [type, setType] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (image) {
      const storageRef = storage().ref(`images/${image.name}`);
      // const imageRef = firestore.collection('carouselImages').doc();
      const imageRef = doc(db, 'carouselImages');

      await storageRef.put(image);
      const imageUrl = await storageRef.getDownloadURL();

      // await imageRef.set({
      //   imageUrl,
      //   type,
      // });
      await addDoc(imageRef, {
        imageUrl,
        type,
      });

      setImage(null);
      setType('');
    }
  };

  return (
    <div>
      <input type="file" multiple onChange={handleImageChange} />
      <input
        type="text"
        placeholder="Image Type"
        value={type}
       
        onChange={(e) => setType(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}
export default ImageUploadForm;