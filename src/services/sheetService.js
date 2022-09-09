import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/sheet';

function sheetUrl(id) {
    return `${apiEndPoint}/${id}`;
  }

export function getSheets(){
    return http.get(apiEndPoint);
}

export function getSheet(sheetId){
    return http.get(sheetUrl(sheetId));
}

export function saveSheet(sheet){
    if(sheet._id){
        const body = {...sheet};
        delete body._id;
        return http.put(sheetUrl(sheet._id), body);
    }
    return http.post(apiEndPoint, sheet);
}

export function deleteSheet(sheetId){
    return http.delete(sheetUrl(sheetId));
}