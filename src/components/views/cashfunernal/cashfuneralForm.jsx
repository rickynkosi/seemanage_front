import React from 'react';
import Joi from 'joi-browser';
import Form from '../../common/form';
import { getCashFuneral, saveCashFuneral } from '../../../services/cashfuneralService';
// import { getGenres } from '../../services/Service';


class CashFuneralForm extends Form {
    state = { 
        data: { fullname: '', idnumber: '', phonenumber: '', amount: '', services: '' },
        // genres: [],
        errors: {}
     }; 

    schema = {
        _id: Joi.string(),
        fullname: Joi.string().required().label('Enter Fullname'),
        idnumber: Joi.number().required().label('ID Number'),
        phonenumber: Joi.number().required().label('Phone Number'),
        amount: Joi.number().required().label('Amount'),
        services: Joi.string().required().label('Services')
    };

    async populateCashFuneral(){
        try{
            const cashfuneralId = this.props.match.params.id;
            if (cashfuneralId === "new") return;

            const cashfuneral = await getCashFuneral(cashfuneralId);
            this.setState({ data: this.mapToViewModel(cashfuneral) });
        }
        catch(ex){
            if(ex.response && ex.response.status === 404){
                this.props.history.replace("/not-found");
            }
        }
    }

    async componentDidMount(){
        await this.populateCashFuneral();
    }

    mapToViewModel(cashfuneral){
        return {
            _id: cashfuneral._id,
            fullname: cashfuneral.fullname,
            idnumber: cashfuneral.idnumber,
            phonenumber: cashfuneral.phonenumber,
            amount: cashfuneral.amount,
            services: cashfuneral.services
        };
    }

    doSubmit =  async () => {
        await saveCashFuneral(this.state.data);

        // this.props.history.push("/cashfuneral");
    };


    render( ) { 
        return (
            <div>
                <h1>CashFuneral Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('fullname','Enter Fullname')}
                    {this.renderInput('idnumber','ID Number')}
                    {this.renderInput('phonenumber','Phone Number')}
                    {this.renderInput('amount','Amount')}
                    {this.renderInput('services','Services Offered')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
 
export default CashFuneralForm;