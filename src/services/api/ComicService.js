import axios from 'axios';
import {Config} from 'react-native-config';
import {axiosQueryParams} from '../../helpers/AxiosHelper';

class ComicService {
  getComics = async () => {
    return axios.get(`${Config.API_URL}/v1/public/comics?${axiosQueryParams}`);
  };

  getComic = async ({comicId}) => {
    return axios.get(
      `${Config.API_URL}/v1/public/comics/${comicId}?${axiosQueryParams}`,
    );
  };

  getCharactersOfComic = async ({comicId}) => {
    return axios.get(
      `${Config.API_URL}/v1/public/comics/${comicId}/characters?${axiosQueryParams}`,
    );
  };

  getCreatorsOfComic = async ({comicId}) => {
    return axios.get(
      `${Config.API_URL}/v1/public/comics/${comicId}/creators?${axiosQueryParams}`,
    );
  };
}

export default new ComicService();
