import ArtObject from "../components/ArtObject";
import notFound from "../assets/notfound.jpg";

const Results = ({ artObjects }) => {
  return (
    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {artObjects.map((artObject) => {
        return (
          <ArtObject
            artist={artObject.artist}
            image={artObject.hasImage ? artObject.webImage?.url : notFound}
            key={artObject.id}
            title={artObject.title}
            id={artObject.id}
          />
        );
      })}
    </div>
  );
};

export default Results;
