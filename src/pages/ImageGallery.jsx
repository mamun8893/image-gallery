import { useState } from "react";
import GalleryItem from "../components/GalleryItem";

const ImageGallery = () => {
  ///Component state
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
  ]);

  const [selectedImages, setSelectedImages] = useState([]);
  const [draggedImage, setDraggedImage] = useState(null);

  //Handle delete
  const handleDelete = () => {
    const updatedImages = images.filter(
      (image) => !selectedImages.includes(image)
    );
    setImages(updatedImages);
    setSelectedImages([]);
  };

  //Handle select

  const handleSelect = (image) => {
    if (selectedImages.includes(image)) {
      setSelectedImages(
        selectedImages.filter((selected) => selected !== image)
      );
    } else {
      setSelectedImages([...selectedImages, image]);
    }
  };

  //Handle drag and drop

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

  //Handle image upload

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImages([
        ...images,
        { id: images.length + 1, src: URL.createObjectURL(file) },
      ]);
    }
  };
  //image column divided
  const column1Images = images.slice(0, 7);
  const column2Images = images.slice(7);

  return (
    <div className="container">
      <div className="gallery-wrapper">
        <div className="gallery-header">
          {selectedImages.length > 0 ? (
            <>
              <h3>{selectedImages?.length} Files Selected</h3>
              <div className="button-container">
                <button onClick={handleDelete}>Delete Files</button>
              </div>
            </>
          ) : (
            <h3>Gallery</h3>
          )}
        </div>
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
              <div
                className="select-item-checkbox"
                onClick={() => handleSelect(column1Images[0])}
              >
                <input
                  type="checkbox"
                  checked={selectedImages.includes(column1Images[0])}
                />
              </div>
            </div>
            <div className="gallery-item-wrap">
              {column1Images.slice(1).map((image) => (
                <GalleryItem
                  key={image.id}
                  image={image}
                  handleSelect={handleSelect}
                  handleDragStart={handleDragStart}
                  handleDragOver={handleDragOver}
                  handleDrop={handleDrop}
                  selectedImages={selectedImages}
                />
              ))}
            </div>
          </div>

          <div className="column2">
            {column2Images.map((image) => (
              <GalleryItem
                key={image.id}
                image={image}
                handleDragStart={handleDragStart}
                handleDragOver={handleDragOver}
                handleDrop={handleDrop}
                selectedImages={selectedImages}
                handleSelect={handleSelect}
              />
            ))}
            <div className="image-item select-file">
              <input type="file" onChange={handleImage} />
              <img src="./image-icon.png" alt="icon" />
              <h4>Add Image</h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;
