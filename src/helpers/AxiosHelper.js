import {Config} from 'react-native-config';
let CryptoJS = require('crypto-js');

const currentDate = new Date();
const ts = currentDate.getTime();

const public_key = Config.PUBLIC_API_KEY;
const private_key = Config.PRIVATE_API_KEY;

const str = `${ts}${private_key}${public_key}`;
const hash = CryptoJS.MD5(str);

export const axiosQueryParams = `ts=${ts}&apikey=${public_key}&hash=${hash}`;
