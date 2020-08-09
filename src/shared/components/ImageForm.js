import React, { useState } from "react";

const ImageForm = (props) => {
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');

  const onChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const onChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("title", title);
    formData.append("image", image);

    props.addImage(formData, props.history);
    setImage('')
    setTitle('')
  };
  return (
    <div className="form-container">
      <form encType="multipart/form-data" onSubmit={onSubmit}>
        <h2>Image Form</h2>
        <label className="form-label">Image Title</label>
        <input
          className="form-input"
          placeholder="Enter Image Title"
          type="text"
          value={title}
          onChange={onChangeTitle}
        />
        <label className="form-label">Choose an Image</label>
        <input type="file" className="form-input" onChange={onChangeImage} />
        <button type="submit" className="submit-btn">
          Submit!
        </button>
      </form>
    </div>
  );
};

export default ImageForm;
