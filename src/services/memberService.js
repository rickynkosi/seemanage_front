import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/member';

function MemberUrl(id){
    return `${apiEndPoint}/${id}`;
}

export function getMembers(){
    return http.get(apiEndPoint);
}

export function getMember(memberId){
    return http.get(MemberUrl(memberId));
}

export function saveMember(member){
    if(member._id){
        const body = {...member}
        return http.put(MemberUrl(member._id), body);
    }

    return http.post(apiEndPoint, member);
}

export function deleteMember(memberId){
    return http.delete(MemberUrl(memberId));
}