import React from 'react';
import { useCollectionData } from 'react-firebase-hooks/firestore';
import { collection, query,where } from 'firebase/firestore';
import { db } from '../../firebase';

function FetchCarousel({ type }) {
 
  const q = query(collection(db,'carouselImages'), where('type', '==', type || null));

  const [images] = useCollectionData(q);

  return (
    <div className="carousel">
      {images && images.map((image, index) => (
        <div key={index} className="carousel-slide">
          <img src={image.imageUrl} alt={`Slide ${index}`} />
        </div>
      ))}
    </div>
  );
}

export default FetchCarousel;
