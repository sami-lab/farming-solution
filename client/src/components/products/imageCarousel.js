import React, { useEffect, useState } from 'react';
// import { _IMAGES } from "../data/data";
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();

export default function ImageCarousel(props) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    if (props.images) {
      setItems(
        props.images.map((img) => {
          return {
            original: publicRuntimeConfig.backend + '/files/' + img,
            thumbnail: publicRuntimeConfig.backend + '/files/' + img,
          };
        })
      );
    }
  }, [props.images]);
  return (
    <div>
      <ImageGallery
        showNav={false}
        showPlayButton={false}
        showFullscreenButton={false}
        showThumbnails={true}
        items={items}
      />
    </div>
  );
}
