import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/branch';

function branchUrl(id) {
    return `${apiEndPoint}/${id}`;
  }

export function getBranches(){
    return http.get(apiEndPoint);
}

export function getBranch(branchId){
    return http.get(branchUrl(branchId));
}

export function saveBranch(branch){
    if(branch._id){
        const body = {...branch};
        delete body._id;
        return http.put(branchUrl(branch._id), body);
    }
    return http.post(apiEndPoint, branch);
}

export function deleteBranch(branchId){
    return http.delete(branchUrl(branchId));
}