import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/policy';
export function getPolicies(){
    return http.get(apiEndPoint);
}

export function getPolicy(policyId){
    return http.get(apiEndPoint + '/' + policyId)
}

export function savePolicy(policy){
    if(policy._id){
        const body = {...policy}
        return http.put(apiEndPoint + '/' + policy._id, body)
    }
}

export function deletePolicy(policyId){
    return http.delete(apiEndPoint + '/' + policyId);
}