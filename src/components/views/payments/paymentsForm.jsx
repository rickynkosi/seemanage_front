import React from 'react';
import Joi from 'joi-browser';
import Form from '../../common/form';
import { getPayment, savePayment } from '../../../services/paymentService';
// import { getGenres } from '../../services/Service';


class PaymentsForm extends Form {
    const 
    state = { 
        data: { districtcode: '', districtname: '' },
        errors: {}
     }; 

    schema = {
        _id: Joi.string(),
        districtcode: Joi.string().required().label('District Code'),
        districtname: Joi.string().required().label('District Name')
    };

    async populateDistrict(){
        try{
            const districtId = this.props.match.params.id;
            if (districtId === "new") return;

            const district = await getPayment(districtId);
            this.setState({ data: this.mapToViewModel(district) });
        }
        catch(ex){
            if(ex.response && ex.response.status === 404){
                this.props.history.replace("/not-found");
            }
        }
    }

    async componentDidMount(){
        await this.populateDistrict();
    }

    mapToViewModel(district){
        return {
            _id: district._id,
            districtcode: district.districtcode,
            districtname: district.districtname,
        };
    }

    doSubmit = () => {
        savePayment(this.state.data);

        this.props.history.push("/payments");
    };


    render( ) { 
        return (
            <div>
                <h1>Payment Form</h1>
                {this.renderInput('districtcode','District Code')}
                {this.renderInput('districtname','District Name')}
                {this.renderButton('Save')}
            </div>
        );
    }
}
 
export default PaymentsForm;