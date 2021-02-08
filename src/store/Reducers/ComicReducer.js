import {
  GET_COMICS,
  ADD_COMICS,
  GET_COMIC_DETAIL,
  GET_CHARACTERS_OF_COMIC,
  GET_CREATORS_OF_COMIC,
} from '../Actions/ActionTypes';

import update from 'react-addons-update';

const initialState = {
  comics: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMICS:
      return (state = update(state, {comics: {$set: action.comics}}));

    case ADD_COMICS:
      return (state = update(state, {comics: {$push: action.comics}}));

    case GET_COMIC_DETAIL:
      return state;

    case GET_CHARACTERS_OF_COMIC:
      return state;

    case GET_CREATORS_OF_COMIC:
      return state;

    default:
      return state;
  }
};

export default reducer;
