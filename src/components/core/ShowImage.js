import React from "react";
import { API } from "../../config";

const showImage = ({ item, url, className }) => {
  const showImageBasedOnCardOrCart = (className) => {
    return className == "cartcheck" ? (
      <img
        src={`${API}/${url}/photo/${item._id}`}
        alt={item.name}
        style={{ maxHeight: "100%", maxWidth: "100%" }}
      />
    ) : (
      <div className="product-img">
        <img
          src={`${API}/${url}/photo/${item._id}`}
          alt={item.name}
          style={{ maxHeight: "100%", maxWidth: "100%" }}
        />
      </div>
    );
  };

  return showImageBasedOnCardOrCart(className);
};

export default showImage;
