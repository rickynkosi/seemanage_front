import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/user';
export function getUsers(){
    return http.get(apiEndPoint);
}

export function getUser(userId){
    return http.get(apiEndPoint + '/' + userId);
}

export function updateUser(user){
    if(user._id){
        const body = {...user}
        return http.put(apiEndPoint + '/' + user._id, body);
    }
}

export function deleteUsers(userId){
    return http.delete(apiEndPoint + '/' + userId);
}