import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BookmarkContext from "../contexts/BookmarkContext";
import notFound from "../assets/notfound.jpg";
import LoadingAnimation from "./LoadingAnimation";
import fetchArtDetails from "../apiMethods/fetchArtDetails";
import { useContext } from "react";

const ArtObjectDetails = () => {
  const { id } = useParams();
  const results = useQuery(["details", id], fetchArtDetails);
  const { bookmarkSet, addToBookmarkSet } = useContext(BookmarkContext);
  const artDetail = results?.data?.artObject;

  return results.isLoading ? (
    <LoadingAnimation />
  ) : (
    <div className="m-20">
      <div className="flex items-center">
        <img
          src={artDetail.hasImage ? artDetail.webImage?.url : notFound}
          alt={artDetail.label?.title}
          className="max-w-xl"
        />
        <div className="text-center p-4">
          <div className="p-4 text-3xl">{artDetail.label?.title}</div>
          <h2 className="p-4 text-xl italic">{artDetail.label?.makerLine}</h2>
          <h2 className="p-4">{artDetail.label?.description}</h2>
        </div>
      </div>
      <div className="flex justify-center items-center mb-20 mt-10">
      <button
        disabled={bookmarkSet.has(id)}
        onClick={() => addToBookmarkSet(id)}
        className={`p-10 bg-transparent text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded
        ${bookmarkSet.has(id) ? 'opacity-50 cursor-not-allowed':'hover:bg-teal-500'} `
  }>
        Add to Set
      </button>
      </div>
    </div>
  );
};

export default ArtObjectDetails;
