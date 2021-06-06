import PropTypes from "prop-types";
import { Galleria } from "primereact/galleria";

function ImagesPreview(props) {
  const { images } = props;
  const itemTemplate = (item) => {
    return <img src={item} className="image-full" />;
  };

  const thumbnailTemplate = (item) => {
    return <img src={item} className="image-thumb" />;
  };

  return (
    images?.length > 0 && (
      <Galleria
        value={images}
        item={itemTemplate}
        thumbnail={thumbnailTemplate}
      />
    )
  );
}

ImagesPreview.propTypes = { images: PropTypes.array };

export default ImagesPreview;
