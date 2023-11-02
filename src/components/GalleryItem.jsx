/* eslint-disable react/prop-types */

const GalleryItem = ({
  image,
  handleSelect,
  handleDragStart,
  handleDragOver,
  handleDrop,
  selectedImages,
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
    >
      <img src={image.src} alt={`Image ${image.id}`} />
      <div className="select-item-checkbox" onClick={() => handleSelect(image)}>
        <input type="checkbox" checked={selectedImages.includes(image)} />
      </div>
    </div>
  );
};

export default GalleryItem;
