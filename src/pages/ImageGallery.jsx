import { useState } from "react";

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

  return (
    <div className="container">
      <div className="image-gallery">
        <div
          className={`featured-image ${
            draggedImage === images[0] ? "dragged" : ""
          }`}
          draggable
          onDragStart={(e) => handleDragStart(e, images[0])}
          onDragOver={handleDragOver}
          onDrop={(e) => handleDrop(e, images[0])}
        >
          {images[0] && <img src={images[0].src} alt={`Featured Image`} />}
        </div>
        <div className="image-list">
          {images.slice(1).map((image) => (
            <div
              key={image.id}
              className={`image-item ${
                selectedImages.includes(image) ? "selected" : ""
              }`}
              draggable
              onDragStart={(e) => handleDragStart(e, image)}
              onDragOver={handleDragOver}
              onDrop={(e) => handleDrop(e, image)}
              onClick={() => {
                if (selectedImages.includes(image)) {
                  setSelectedImages(
                    selectedImages.filter((selected) => selected !== image)
                  );
                } else {
                  setSelectedImages([...selectedImages, image]);
                }
              }}
            >
              <img src={image.src} alt={`Image ${image.id}`} />
            </div>
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
