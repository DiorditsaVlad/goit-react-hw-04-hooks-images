import { useState } from "react";

import Searcbar from "./components/SearchBar/SearchBar";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import "./App.css";

export default function App() {
  const [searchbar, setSearchbar] = useState("");

  const onFormSubmit = (searchName) => {
    if (searchName.trim !== "") {
      setSearchbar(searchName);
    }
    return;
  };

  return (
    <div className="App">
      <Searcbar submit={onFormSubmit} />
      <ImageGallery searchbar={searchbar} />
    </div>
  );
}
