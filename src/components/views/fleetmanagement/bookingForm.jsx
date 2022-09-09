import React from 'react';
import Joi from 'joi-browser';
import Form from '../../common/form';
import { getBooking, saveBooking } from '../../../services/bookingService';
// import { getGenres } from '../../services/Service';


class BookingForm extends Form {
    const 
    state = { 
        data: { car: '', driver: '', destination: '', mileage: '' },
        errors: {}
     }; 

    schema = {
        _id: Joi.string(),
        car: Joi.string().required().label('Select Car'),
        driver: Joi.string().required().label('Select Driver'),
        destination: Joi.string().required().label('Enter Destination'),
        mileage: Joi.string().required().label('Enter Mileage')
    };

    async populateDistrict(){
        try{
            const bookingId = this.props.match.params.id;
            if (bookingId === "new") return;

            const booking = await getBooking(bookingId);
            this.setState({ data: this.mapToViewModel(booking) });
        }
        catch(ex){
            if(ex.response && ex.response.status === 404){
                this.props.history.replace("/not-found");
            }
        }
    }

    async componentDidMount(){
        await this.populateBooking();
    }

    mapToViewModel(booking){
        return {
            _id: booking._id,
            car: booking.car,
            driver: booking.driver,
            destination: booking.destination,
            mileage: booking.mileage
        };
    }

    doSubmit = () => {
        saveBooking(this.state.data);

        this.props.history.push("manage");
    };


    render( ) { 
        return (
            <div>
                <h1>Booking Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderSelect('car','select car')}
                    {this.renderSelect('driver','Select Driver')}
                    {this.renderInput('destination','Enter Destination')}
                    {this.renderInput('mileage','Enter Mileage')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
 
export default BookingForm;