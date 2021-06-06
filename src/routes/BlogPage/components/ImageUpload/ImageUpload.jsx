import React from "react";
import PropTypes from "prop-types";
import { Buttons } from "../../../../components/Buttons";

import { ImagesPreview } from "../ImagesPreview";

function ImageUpload(props) {
  return (
    <div className="image-upload">
      <Buttons
        buttontype={"secondary"}
        type="button"
        classNames="image-upload-btn"
      >
        <i className="pi pi-image" />
      </Buttons>
      <ImagesPreview images={[]} />
    </div>
  );
}

ImageUpload.propTypes = {};

export default ImageUpload;
