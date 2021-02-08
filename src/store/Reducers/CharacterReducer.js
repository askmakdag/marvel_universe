import {
  GET_CHARACTERS,
  ADD_CHARACTERS,
  GET_CHARACTER_DETAIL,
  GET_COMICS_OF_CHARACTER,
} from '../Actions/ActionTypes';

import update from 'react-addons-update';

const initialState = {
  characters: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CHARACTERS:
      return (state = update(state, {characters: {$set: action.characters}}));

    case ADD_CHARACTERS:
      return (state = update(state, {characters: {$push: action.characters}}));

    case GET_CHARACTER_DETAIL:
      return state;

    case GET_COMICS_OF_CHARACTER:
      return state;

    default:
      return state;
  }
};

export default reducer;
