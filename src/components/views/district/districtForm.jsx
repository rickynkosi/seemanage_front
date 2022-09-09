import React from 'react';
import Joi from 'joi-browser';
import Form from '../../common/form';
import { getDistrict, saveDistrict } from '../../../services/districtService';
// import { getGenres } from '../../services/Service';


class DistrictForm extends Form {
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

            const { data: district } = await getDistrict(districtId);
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

    doSubmit = async () => {
        await saveDistrict(this.state.data);

        // this.props.history.push("/district");
    };


    render() { 
        return (
            <div>
                <h1>District Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('districtcode','District Code')}
                    {this.renderInput('districtname','District Name')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
 
export default DistrictForm;