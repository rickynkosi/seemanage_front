import React from 'react';
import Joi from 'joi-browser';
import Form from '../../common/form';
import { getDriver, saveDriver } from '../../../services/driverService';
// import { getGenres } from '../../services/Service';


class DriverForm extends Form {
    const 
    state = { 
        data: { fullname: '', driver: '', },
        errors: {}
     }; 

    schema = {
        _id: Joi.string(),
        fullname: Joi.string().required().label('Fullname'),
        phone: Joi.string().required().label('Phone')
    };

    async populateDriver(){
        try{
            const driverId = this.props.match.params.id;
            if (driverId === "new") return;

            const driver = await getDriver(driverId);
            this.setState({ data: this.mapToViewModel(driver) });
        }
        catch(ex){
            if(ex.response && ex.response.status === 404){
                this.props.history.replace("/not-found");
            }
        }
    }

    async componentDidMount(){
        await this.populateDriver();
    }

    mapToViewModel(driver){
        return {
            _id: driver._id,
            fullname: driver.fullname,
            phonenumber: driver.phonenumber,
        };
    }

    doSubmit = () => {
        saveDriver(this.state.data);

        this.props.history.push("managedriver");
    };


    render( ) { 
        return (
            <div>
                <h1>Booking Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderSelect('fullname','Fullname')}
                    {this.renderSelect('phonenumber','Phone')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
 
export default DriverForm;