import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/driver';

function driverUrl(id) {
    return `${apiEndPoint}/${id}`;
  }

export function getDrivers(){
    return http.get(apiEndPoint);
}

export function getDriver(driverId){
    return http.get(driverUrl(driverId));
}

export function saveDriver(driver){
    if(driver._id){
        const body = {...driver};
        delete body._id;
        return http.put(driverUrl(driver._id), body);
    }
    return http.post(apiEndPoint, driver);
}

export function deleteDriver(driverId){
    return http.delete(driverUrl(driverId));
}