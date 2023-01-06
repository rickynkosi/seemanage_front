import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/user';

export function register(user){
    return http.post(apiEndPoint, {
        fullname: user.fullname,
        email: user.email,
        phonenumber: user.phonenumber,
        username: user.username,
        password: user.password
    });
}