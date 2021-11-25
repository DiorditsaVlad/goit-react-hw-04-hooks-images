import s from "./ImageGalleryItem.module.css";
import PropTypes from "prop-types";

export default function ImageGalleryItem({
  webformatURL,
  largeImageURL,
  tags,
  modalOpen,
}) {
  return (
    <li
      className={s.ImageGalleryItem}
      onClick={() => {
        modalOpen(largeImageURL, tags);
      }}
    >
      <img src={webformatURL} alt={tags} className={s.ImageGalleryItemImage} />
    </li>
  );
}
ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
  modalOpen: PropTypes.func.isRequired,
  tags: PropTypes.string,
};
