import {
  GET_COMICS,
  ADD_COMICS,
  GET_COMIC_DETAIL,
  GET_CHARACTERS_OF_COMIC,
  GET_CREATORS_OF_COMIC,
} from './ActionTypes';

export const get_comics = (comics) => {
  return {
    type: GET_COMICS,
    comics: comics,
  };
};

export const add_comics = (comics) => {
  return {
    type: ADD_COMICS,
    comics: comics,
  };
};

export const get_comic_detail = (comic) => {
  return {
    type: GET_COMIC_DETAIL,
    comic: comic,
  };
};

export const get_characters_of_comic = (comicId, characters) => {
  return {
    type: GET_CHARACTERS_OF_COMIC,
    comicId: comicId,
    characters: characters,
  };
};

export const get_creators_of_comic = (comicId, creators) => {
  return {
    type: GET_CREATORS_OF_COMIC,
    comicId: comicId,
    creators: creators,
  };
};
