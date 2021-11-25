// import { useState, useEffect } from "react";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
// import Button from "../Button/Button";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
// import Loader from "react-loader-spinner";
// import Modal from "../Modal/Modal";
import s from "./ImageGallery.module.css";
// import imageApi from "../services";

export default function ImageGallery({ modalOpen, data }) {
  return (
    <>
      <ul className={s.ImageGallery}>
        {data.map((image) => {
          return (
            <ImageGalleryItem
              key={image.id}
              tags={image.tags}
              webformatURL={image.webformatURL}
              largeImageURL={image.largeImageURL}
              modalOpen={modalOpen}
            />
          );
        })}
      </ul>
    </>
  );
}
