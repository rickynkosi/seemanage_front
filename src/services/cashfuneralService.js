import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/cashfuneral';

function cashfuneralUrl(id) {
    return `${apiEndPoint}/${id}`;
  }

export function getCashFunerals(){
    return http.get(apiEndPoint);
}

export function getCashFuneral(cashfuneralId){
    return http.get(cashfuneralUrl(cashfuneralId));
}

export function saveCashFuneral(cashfuneral){
    if(cashfuneral._id){
        const body = {...cashfuneral};
        delete body._id;
        return http.put(cashfuneralUrl(cashfuneral._id), body);
    }
    return http.post(apiEndPoint, cashfuneral);
}

export function deleteCashFuneral(cashfuneralId){
    return http.delete(cashfuneralUrl(cashfuneralId));
}