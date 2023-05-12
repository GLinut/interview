async function fetchArt({ queryKey, pageParam = 1 }) {
  const { artist, title } = queryKey[1];
  const API_KEY = import.meta.env.VITE_RJIKS_API_KEY;

  const res = await fetch(
    `https://www.rijksmuseum.nl/api/en/collection?key=${API_KEY}&involvedMaker=${artist}&q=${title}&p=${pageParam}`
  );

  if (!res.ok)
    throw new Error(
      `FetchArt is failing for the following parametes: ${artist}, ${title}`
    );

  return res.json();
}

export default fetchArt;
