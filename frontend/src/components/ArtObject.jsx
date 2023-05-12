import { Link } from "react-router-dom";
import { useContext } from "react";
import BookmarkContext from "../contexts/BookmarkContext";

const ArtObject = (props) => {
  const { title, artist, image, id } = props;
  const { bookmarkSet } = useContext(BookmarkContext);

  return (
    <div className="flex justify-center items-center">
      <Link to={`/details/${id}`}>
        <div className="mx-auto">
          <img src={image} alt={title} />
        </div>
        <div>
          <h1 className={`text-center ${bookmarkSet.has(id) ? 'bg-blue-500' : 'bg-teal-500' } text-white`}>{title}</h1>
          <h2>{artist}</h2>
        </div>
      </Link>
    </div>
  );
};

export default ArtObject;
