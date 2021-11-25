import { useState, useEffect } from "react";

import Searcbar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import Button from "./components/Button/Button";
import Loader from "react-loader-spinner";
import Modal from "./components/Modal/Modal";
import imageApi from "./components/services";
import "./App.css";

export default function App() {
  const [searchbar, setSearchbar] = useState("");
  const [status, setStatus] = useState("idle");
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [data, setData] = useState([]);
  const [modaleUrl, setModaleUrl] = useState("");
  const [modaleAlt, setModaleAlt] = useState("");

  const onFormSubmit = (searchName) => {
    if (searchName.trim !== "") {
      setSearchbar(searchName);
      setStatus("pending");
    }
    return;
  };

  useEffect(() => {
    setStatus("pending");
    if (searchbar.trim() === "") {
      setStatus("idle");
      return;
    }

    imageApi
      .fatchImage(searchbar, page)
      .then((images) => {
        if (images.hits.length === 0) {
          setError("No any picture");
          setStatus("rejected");
          return;
        } else {
          setData((prevState) => [...prevState, ...images.hits]);
          setStatus("resolved");
        }
      })
      .then(() => {
        if (page !== 1) {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: "smooth",
          });
        }
      })
      .catch((error) => setError(error), setStatus("rejected"));
  }, [page, searchbar]);

  const loadMore = () => {
    setPage((prevState) => prevState + 1);
    setStatus("pending");
  };

  const modalOpen = (modaleUrl, modaleAlt) => {
    window.addEventListener("keydown", cleanEventListener);
    setModaleUrl(modaleUrl);
    setModaleAlt(modaleAlt);
  };
  const modalClose = () => {
    window.removeEventListener("keydown", cleanEventListener);
    setModaleUrl("");
    setModaleAlt("");
  };

  const cleanEventListener = (e) => {
    if (e.code === "Escape") {
      modalClose();
    }
  };
  return (
    <div className="App">
      <Searcbar submit={onFormSubmit} />
      {status === "idle" && <p>Enter the name of the picture</p>}
      <div>
        <ImageGallery modalOpen={modalOpen} data={data} />
        {status === "resolved" && <Button onClick={loadMore} />}
      </div>
      {status === "pending" && (
        <Loader
          type="Puff"
          color="#00BFFF"
          height={100}
          width={100}
          timeout={3000} //3 secs
        />
      )}
      {modaleUrl && (
        <Modal largeImageURL={modaleUrl} alt={modaleAlt} onClick={modalClose} />
      )}
      {status === "rejected" && <p>{error}</p>}
    </div>
  );
}
