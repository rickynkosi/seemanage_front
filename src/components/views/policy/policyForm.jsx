import React from 'react';
import Joi from 'joi-browser';
import { Outlet } from 'react-router-dom'
import Form from '../../common/form';
import { getPolicy, savePolicy } from '../../../services/policyService';
// import { getGenres } from '../../services/Service';


class PolicyForm extends Form {
    const 
    state = { 
        data: { policycode: '', policyname: '', cover: '', premium: '', benefits: '', extras: '' },
        // genres: [],
        errors: {}
     }; 

    schema = {
        _id: Joi.string(),
        policycode: Joi.string().required().label('Policy Code'),
        policyname: Joi.string().required().label('Policy Name'),
        cover: Joi.string().required().min(0).max(100).label('Cover'),
        premium: Joi.string().required().min(0).max(10).label('Premium'),
        benefits: Joi.string().required().min(0).max(10).label('Benefits'),
        extras: Joi.string().required().min(0).max(10).label('Extras'),
    };

    async populatePolicy(){
        try{
            const policyId = this.props.match.params.id;
            if (policyId === "new") return;

            const policy = await getPolicy(policyId);
            this.setState({ data: this.mapToViewModel(policy) });
        }
        catch(ex){
            if(ex.response && ex.response.status === 404){
                this.props.history.replace("/not-found");
            }
        }
    }

    async componentDidMount(){
        await  this.populatePolicy();
    }

    mapToViewModel(policy){
        return {
            _id: policy._id,
            policycode: policy.policycode,
            policyname: policy.policyname,
            cover: policy.cover,
            premium: policy.premium,
            benefits: policy.benefits,
            extras: policy.extras
        };
    }

    doSubmit = () => {
        savePolicy(this.state.data);

        this.props.history.push("policy");
    };


    render( ) { 
        return (
            <div>
                <h1>Policy Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('policynumber','Policy Number')}
                    {this.renderInput('policyname','Policy Name')}
                    {this.renderInput('cover','Cover')}
                    {this.renderInput('premium','Premium')}
                    {this.renderInput('benefits','Benefits')}
                    {this.renderInput('extras','extras')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
 
export default PolicyForm;