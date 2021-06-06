import React from "react";
import PropTypes from "prop-types";
import { Buttons } from "../../../../components/Buttons";
import { Galleria } from "primereact/galleria";

function ImageUpload(props) {
  const itemTemplate = (item) => {
    return <img src={item} className="image-full" />;
  };

  const thumbnailTemplate = (item) => {
    return <img src={item} className="image-thumb" />;
  };

  return (
    <div className="image-upload">
      <Buttons
        buttontype={"secondary"}
        type="button"
        classNames="image-upload-btn"
      >
        <i className="pi pi-image" />
      </Buttons>
      {[].length > 0 && (
        <Galleria
          value={[]}
          item={itemTemplate}
          thumbnail={thumbnailTemplate}
        />
      )}
    </div>
  );
}

ImageUpload.propTypes = {};

export default ImageUpload;
