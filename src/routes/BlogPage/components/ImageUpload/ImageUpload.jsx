import { useRef, useState } from "react";
import { Buttons } from "../../../../components/Buttons";

import { ImagesPreview } from "../ImagesPreview";
import { useFormContext } from "../NewBlogForm/formContext";

function ImageUpload(props) {
  const { formHandler } = useFormContext();
  const uploadImageRef = useRef(null);

  return (
    <div className="image-upload">
      <Buttons
        buttontype={"secondary"}
        type="button"
        classNames="image-upload-btn"
        onClick={() => uploadImageRef.current.click()}
      >
        <input
          ref={uploadImageRef}
          type="file"
          style={{ display: "none" }}
          onChange={(e) => {
            formHandler.addNewElement(
              "images",
              URL.createObjectURL(e.target.files[0])
            );
          }}
        />
        <i className="pi pi-image" />
      </Buttons>
      <ImagesPreview
        images={
          formHandler?.objectValues?.images?.length > 0
            ? formHandler.objectValues.images
            : []
        }
      />
    </div>
  );
}

export default ImageUpload;
