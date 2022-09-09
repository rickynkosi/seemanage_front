import http from './httpService';
import config from '../config.json';

const apiEndPoint = config.apiUrl + '/driver';

function bookingUrl(id) {
    return `${apiEndPoint}/${id}`;
}

export function getBookings(){
    return http.get(apiEndPoint);
}

export function getBooking(bookingId){
    return http.get(bookingUrl(bookingId));
}

export function saveBooking(booking){
    if(booking._id){
        const body = {...booking};
        delete body._id;
        return http.put(bookingUrl(booking._id), body);
    }
    return http.post(apiEndPoint, booking);
}

export function deleteBooking(bookingId){
    return http.delete(bookingUrl(bookingId));
}