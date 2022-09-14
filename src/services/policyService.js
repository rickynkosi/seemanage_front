import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/policy';

function policyUrl(id) {
    return `${apiEndPoint}/${id}`;
  }

export function getPolicies(){
    return http.get(apiEndPoint);
}

export function getPolicy(policyId){
    return http.get(policyUrl(policyId));
}

export function savePolicy(policy){
    if(policy._id){
        const body = {...policy};
        delete body._id;
        return http.put(policyUrl(policy._id), body);
    }
    return http.post(apiEndPoint, policy);
}

export function deletePolicy(policyId){
    return http.delete(policyUrl(policyId));
}