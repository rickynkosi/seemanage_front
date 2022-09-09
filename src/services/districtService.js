import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/district';

function districtUrl(id) {
    return `${apiEndPoint}/${id}`;
  }

export function getDistricts(){
    return http.get(apiEndPoint);
}

export function getDistrict(districtId){
    return http.get(districtUrl(districtId));
}

export function saveDistrict(district){
    if(district._id){
        const body = {...district};
        delete body._id;
        return http.put(districtUrl(district._id), body);
    }
    return http.post(apiEndPoint, district);
}

export function deleteDistrict(districtId){
    return http.delete(districtUrl(districtId));
}