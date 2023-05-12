import { useState, Fragment } from "react";
import { useInfiniteQuery } from "@tanstack/react-query";
import Results from "./Results";
import LoadingAnimation from "./LoadingAnimation";
import fetchArt from "../apiMethods/fetchArt";

const AUTHORS = [
  "Rembrandt van Rijn",
  "Johannes Vermeer",
  "Roelant Savery",
  "Gerard van Honthorst",
];

const DEFAULT_PAGE_LENGTH = 10;

const ArtList = () => {
  const [requestParams, setRequestParams] = useState({
    title: "",
    artist: "",
  });

  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery(["artList", requestParams], fetchArt, {
      getNextPageParam: (lastPage, pages) => {
        return pages?.length * DEFAULT_PAGE_LENGTH < lastPage.count
          ? pages?.length + 1
          : undefined;
      },
    });

  return (
    <div className="w-10/12 mx-auto h-10/12">
      <form
        className="bg-white shadow-md rounded p-8 mb-4 w-10/12 mx-auto grid grid-cols-5 gap-3 items-center"
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
        <label
          htmlFor="title"
          className="block text-gray-700 text-sm font-bold mb-2 col-span-2"
        >
          Title
          <input
            id="title"
            name="title"
            placeholder="Enter title/theme..."
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </label>

        <label
          htmlFor="artist"
          className="block text-gray-700 text-sm font-bold mb-2 col-span-2"
        >
          Artist
          <select
            id="artist"
            name="artist"
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option />
            {AUTHORS.map((artist) => (
              <option key={artist} value={artist}>
                {artist}
              </option>
            ))}
          </select>
        </label>

        <button className="p-10 allign-middle mt-3 bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded">
          Search
        </button>
      </form>
      {data?.pages.length === 1 && data?.pages[0]?.artObjects?.length === 0 ? (
        <h1>No Art Found</h1>
      ) : (
        data?.pages?.map((group, i) => {
          return (
            <Fragment key={i}>
              <Results artObjects={group.artObjects} />
            </Fragment>
          );
        })
      )}
      {(isLoading || isFetchingNextPage) && <LoadingAnimation />}

      <div className="flex justify-center items-center mb-20 mt-10">
        <button
          onClick={() => fetchNextPage()}
          disabled={!hasNextPage || isFetchingNextPage}
          className="p-10 bg-transparent hover:bg-teal-500 text-teal-700 font-semibold hover:text-white py-2 px-4 border border-teal-500 hover:border-transparent rounded"
        >
          {isFetchingNextPage
            ? "Loading more..."
            : hasNextPage
            ? "Load More"
            : "Nothing more to load"}
        </button>
      </div>
    </div>
  );
};

export default ArtList;
