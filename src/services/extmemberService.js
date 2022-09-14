import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/extmember';

function extmemberUrl(id) {
    return `${apiEndPoint}/${id}`;
  }

export function getExtMembers(){
    return http.get(apiEndPoint);
}

export function getExtMember(extmemberId){
    return http.get(extmemberUrl(extmemberId));
}

export function saveExtMember(extmember){
    if(extmember._id){
        const body = {...extmember};
        delete body._id;
        return http.put(extmemberUrl(extmember._id), body);
    }
    return http.post(apiEndPoint, extmember);
}

export function deleteExtMember(extmemberId){
    return http.delete(extmemberUrl(extmemberId));
}