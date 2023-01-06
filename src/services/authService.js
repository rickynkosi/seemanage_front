import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/auth';

export function login(username, password){
    return http.post(apiEndPoint, { username, password });
}