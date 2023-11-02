import { useState } from "react";
import GalleryItem from "../components/GalleryItem";

const ImageGallery = () => {
  const [images, setImages] = useState([
    { id: 1, src: "./image-1.webp", isFeature: true },
    { id: 2, src: "./image-2.webp", isFeature: false },
    { id: 3, src: "./image-3.webp", isFeature: false },
    { id: 4, src: "./image-4.webp", isFeature: false },
    { id: 5, src: "./image-5.webp", isFeature: false },
    { id: 6, src: "./image-6.webp", isFeature: false },
    { id: 7, src: "./image-7.webp", isFeature: false },
    { id: 8, src: "./image-8.webp", isFeature: false },
    { id: 9, src: "./image-9.webp", isFeature: false },
    // Add more images here
  ]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);

  // const handleDelete = () => {
  //   const updatedImages = images.filter(
  //     (image) => !selectedImages.includes(image)
  //   );
  //   setImages(updatedImages);
  //   setSelectedImages([]);
  // };

  const handleDragStart = (e, image) => {
    setDraggedImage(image);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, image) => {
    if (draggedImage && image !== draggedImage) {
      const updatedImages = images.slice();
      const draggedIndex = updatedImages.findIndex(
        (img) => img === draggedImage
      );
      const dropIndex = updatedImages.findIndex((img) => img === image);

      [updatedImages[draggedIndex], updatedImages[dropIndex]] = [
        updatedImages[dropIndex],
        updatedImages[draggedIndex],
      ];

      setImages(updatedImages);
      setDraggedImage(null);
    }
  };

  //get first 7 image

  const column1Images = images.slice(0, 7);
  const column2Images = images.slice(7);

  return (
    <div className="container">
      <div className="image-gallery">
        <div className="column1">
          <div
            className={`featured-image image-item ${
              draggedImage === images[0] ? "dragged" : ""
            }`}
            draggable
            onDragStart={(e) => handleDragStart(e, images[0])}
            onDragOver={handleDragOver}
            onDrop={(e) => handleDrop(e, column1Images[0])}
          >
            {column1Images[0] && (
              <img src={column1Images[0].src} alt={`Featured Image`} />
            )}
          </div>
          <div className="gallery-item-wrap">
            {column1Images.slice(1).map((image) => (
              <GalleryItem
                key={image.id}
                image={image}
                setSelectedImages={setSelectedImages}
                selectedImages={selectedImages}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
              />
            ))}
          </div>
        </div>

        <div className="column2">
          {column2Images.map((image) => (
            <GalleryItem
              key={image.id}
              image={image}
              setSelectedImages={setSelectedImages}
              selectedImages={selectedImages}
              handleDragStart={handleDragStart}
              handleDragOver={handleDragOver}
              handleDrop={handleDrop}
            />
          ))}
        </div>

        {/* <div className="button-container">
        <button onClick={handleDelete}>Delete Selected</button>
      </div> */}
      </div>
    </div>
  );
};

export default ImageGallery;
