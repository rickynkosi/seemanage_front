import React from 'react';
import Joi from 'joi-browser';
import Form from '../../common/form';
import { getBranch, saveBranch } from '../../../services/branchService';
// import { getGenres } from '../../services/Service';


class BranchForm extends Form {
    state = { 
        data: { branchid: '', branchname: '' },
        errors: {}
     }; 

    schema = {
        _id: Joi.string(),
        branchid: Joi.string().required().label('Branch Id'),
        branchname: Joi.string().required().label('Branch Name')
    };

    async populateDistrict(){
        try{
            const districtId = this.props.match.params.id;
            if (districtId === "new") return;

            const { data: district } = await getBranch(districtId);
            this.setState({ data: this.mapToViewModel(district) });
        }
        catch(ex){
            if(ex.response && ex.response.status === 404){
                this.props.history.replace("/not-found");
            }
        }
    }

    async componentDidMount(){
        await this.populateBranch();
    }

    mapToViewModel(branch){
        return {
            _id: branch._id,
            branchid: branch.branchid,
            branchname: branch.branchname,
        };
    }

    doSubmit = async () => {
        await saveBranch(this.state.data);

        this.props.history.push("/branch");
    };


    render() { 
        return (
            <div>
                <h1>District Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('branchid','Branch Id')}
                    {this.renderInput('branchname','Branch Name')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
 
export default BranchForm;