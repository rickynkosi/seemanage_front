import React from 'react';
import Joi from 'joi-browser';
import Form from '../../common/form';
import { getCar, saveCar } from '../../../services/carService';
// import { getGenres } from '../../services/Service';


class CarForm extends Form {
    const 
    state = { 
        data: { carreg: '', carmodel: '', mileage: '' },
        errors: {}
     }; 

    schema = {
        _id: Joi.string(),
        carreg: Joi.string().required().label('Enter Registration Number'),
        carmodel: Joi.string().required().label('Enter Car Model / Name'),
        mileage: Joi.number().required().label('Enter Car Mileage')
    };

    async populateCar(){
        try{
            const carid = this.props.match.params.id;
            if (carid === "new") return;

            const car = await getCar(carid);
            this.setState({ data: this.mapToViewModel(car) });
        }
        catch(ex){
            if(ex.response && ex.response.status === 404){
                this.props.history.replace("/not-found");
            }
        }
    }

    async componentDidMount(){
        await this.populateCar();
    }

    mapToViewModel(car){
        return {
            _id: car._id,
            carreg: car.carreg,
            carmodel: car.carmodel,
            mileage: car.mileage
        };
    }

    doSubmit = () => {
        saveCar(this.state.data);

        this.props.history.push("managecar");
    };


    render( ) { 
        return (
            <div>
                <h1>Booking Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderSelect('carreg','Enter Registration Number')}
                    {this.renderSelect('carmodel','Enter Car Model / Name')}
                    {this.renderInput('mileage','Enter Car Mileage')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
 
export default CarForm;