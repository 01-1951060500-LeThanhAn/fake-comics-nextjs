import { ComicFollow } from "../Interface/Interface";

export const addComicsHistory = (comic: ComicFollow) => {
  let historyComics: ComicFollow[] =
    JSON.parse(localStorage.getItem("comics") as string) || [];

  const visitedComics = historyComics.some(
    (item: ComicFollow) => item.slug === comic.slug
  );

  if (visitedComics) {
    historyComics = historyComics.filter(
      (item: ComicFollow) => item.slug !== comic.slug
    );
  }

  historyComics.unshift(comic);
  localStorage.setItem("comics", JSON.stringify(historyComics));
};

export const historyComic = () => {
  let historyComic: ComicFollow[] =
    JSON.parse(localStorage.getItem("comics") as string) || [];

  return historyComic;
};
