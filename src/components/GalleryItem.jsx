/* eslint-disable react/prop-types */

const GalleryItem = ({
  image,
  setSelectedImages,
  selectedImages,
  handleDragStart,
  handleDragOver,
  handleDrop,
}) => {
  return (
    <div
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
  );
};

export default GalleryItem;
