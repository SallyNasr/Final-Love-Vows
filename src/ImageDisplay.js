import React, { useState, useEffect } from 'react';
import { firestore } from './firebase';

function ImageDisplay() {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const unsubscribe = firestore.collection('images').onSnapshot((snapshot) => {
      const imageList = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setImages(imageList);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div>
      <h2>Images from Firestore</h2>
      <div>
        {images.map((image) => (
          <img key={image.id} src={image.imageUrl} alt={`Image ${image.id}`} />
        ))}
      </div>
    </div>
  );
}

export default ImageDisplay;
