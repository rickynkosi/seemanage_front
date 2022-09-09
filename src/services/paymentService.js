import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/payment';

function paymentUrl(id) {
    return `${apiEndPoint}/${id}`;
  }

export function getPayments(){
    return http.get(apiEndPoint);
}

export function getPayment(paymentId){
    return http.get(paymentUrl(paymentId));
}

export function savePayment(payment){
    if(payment._id){
        const body = {...payment};
        delete body._id;
        return http.put(paymentUrl(payment._id), body);
    }
    return http.post(apiEndPoint, payment);
}

export function deletePayment(paymentId){
    return http.delete(paymentUrl(paymentId));
}