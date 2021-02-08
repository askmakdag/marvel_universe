import axios from 'axios';
import {Config} from 'react-native-config';
import {axiosQueryParams} from '../../helpers/AxiosHelper';

class CharacterService {
  getCharacters = async () => {
    return axios.get(
      `${Config.API_URL}/v1/public/characters?${axiosQueryParams}`,
    );
  };

  getCharacter = async ({characterId}) => {
    return axios.get(
      `${Config.API_URL}/v1/public/characters${characterId}?${axiosQueryParams}`,
    );
  };

  getComicsOfCharacter = async ({characterId}) => {
    return axios.get(
      `${Config.API_URL}/v1/public/characters${characterId}/comics?${axiosQueryParams}`,
    );
  };
}

export default new CharacterService();
