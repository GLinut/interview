import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Results from "./Results";
import LoadingAnimation from "./LoadingAnimation";
import fetchArt from "../apiMethods/fetchArt";
const AUTHORS = [
  "Rembrandt van Rijn",
  "Johannes Vermeer",
  "Roelant Savery",
  "Gerard van Honthorst",
];

const ArtList = () => {
  const [requestParams, setRequestParams] = useState({
    title: "",
    artist: "",
  });

  const results = useQuery(["artList", requestParams], fetchArt);
  const artObjects = results?.data?.artObjects ?? [];

  return (
    <div className="w-10/12 mx-auto">
      <form
        className="p-5 m-10 rounded-lg bg-gray-200 shadow-lg flex flex-col justify-center items-center"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const obj = {
            artist: formData.get("artist") ?? "",
            title: formData.get("title") ?? "",
          };
          setRequestParams(obj);
        }}
      >
        <label htmlFor="title">
          Title
          <input
            id="title"
            name="title"
            placeholder="Title"
            className="w-60 mb-10 block"
          />
        </label>

        <label htmlFor="artist">
          Artist
          <select id="artist" name="artist" className="w-60 mb-5 block">
            <option />
            {AUTHORS.map((artist) => (
              <option key={artist} value={artist}>
                {artist}
              </option>
            ))}
          </select>
        </label>

        <button className="text-white rounded px-7 py-2 border-none bg-teal-500">
          Submit
        </button>
      </form>
      {results?.isLoading ? (
        <LoadingAnimation />
      ) : (
        <Results artObjects={artObjects} />
      )}
    </div>
  );
};

export default ArtList;
