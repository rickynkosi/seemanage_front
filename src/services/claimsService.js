import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/claims';

function claimUrl(id) {
    return `${apiEndPoint}/${id}`;
  }

export function getClaims(){
    return http.get(apiEndPoint);
}

export function getClaim(claimId){
    return http.get(claimUrl(claimId));
}

export function saveClaim(claim){
    if(claim._id){
        const body = {...claim};
        delete body._id;
        return http.put(claimUrl(claim._id), body);
    }
    return http.post(apiEndPoint, claim);
}

export function deleteClaim(claimId){
    return http.delete(claimUrl(claimId));
}