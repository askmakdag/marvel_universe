import {
  GET_CHARACTERS,
  ADD_CHARACTERS,
  GET_CHARACTER_DETAIL,
  GET_COMICS_OF_CHARACTER,
} from './ActionTypes';

export const get_characters = (characters) => {
  return {
    type: GET_CHARACTERS,
    characters: characters,
  };
};

export const add_characters = (characters) => {
  return {
    type: ADD_CHARACTERS,
    characters: characters,
  };
};

export const get_character_detail = (character) => {
  return {
    type: GET_CHARACTER_DETAIL,
    character: character,
  };
};

export const get_comics_of_character = (characterId, comics) => {
  return {
    type: GET_COMICS_OF_CHARACTER,
    characterId: characterId,
    comics: comics,
  };
};
