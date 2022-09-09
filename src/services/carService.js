import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/car';

function carUrl(id) {
    return `${apiEndPoint}/${id}`;
  }

export function getCars(){
    return http.get(apiEndPoint);
}

export function getCar(carId){
    return http.get(carUrl(carId));
}

export function saveCar(car){
    if(car._id){
        const body = {...car};
        delete body._id;
        return http.put(carUrl(car._id), body);
    }
    return http.post(apiEndPoint, car);
}

export function deleteCar(carId){
    return http.delete(carUrl(carId));
}