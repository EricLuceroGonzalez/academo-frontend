import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import LoadingSpinner from "../components/UIElements/LoadingSpinner";
import { getAllImages } from "../actions/imageActions";
import theApi from "../api/index";
import "./images-styles.css";

const AllImages = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [images, setImages] = useState([]);

  useEffect(() => {
    const getTest = async () => {
      try {
        const data = await theApi.getImages();
        setImages(data.data);
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
      }
    };
    getTest();
  }, []);

  const renderImages = () => {
    console.warn(`render ${images.length} Images`);
    if (images) {
      return images.map((image, k) => {
        console.info(`k = ${k}`);
        return (
          <div className="image-card-container" key={k}>
            <div key={image.imageId} className="image-card">
              <h4 className="image-title">{image.title}</h4>
              <img
                className="main-image"
                src={image.image}
                alt="This is a terrible description!"
              />
            </div>
          </div>
        );
      });
    }
  };

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <div style={{ border: "1px dashed red" }}>
        {images.length !== 0 ? renderImages() : ""}
      </div>
    </React.Fragment>
  );
};

// const mapStateToProps = (state) => {
//   return {
//     images: Object.values(state),
//   };
// };

export default AllImages;
// connect(mapStateToProps, { getAllImages })(AllImages);
