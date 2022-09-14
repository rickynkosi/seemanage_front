import React from 'react';
import Joi from 'joi-browser';
import Form from '../../common/form';
import { getExtMember, saveExtMember } from '../../../services/extmemberService';
// import { getGenres } from '../../services/Service';


class ExtMemberForm extends Form {
    state = { 
        data: { firstname: '', surname: '', mmidnumber: '', idnumber: '', membertype: '', memberrelation: '' },
        errors: {}
     }; 

    schema = {
        _id: Joi.string(),
        firstname: Joi.string().required().label('Firstname'),
        surname: Joi.string().required().label('Surname'),
        mmidnumber: Joi.string().required().label('Main member ID Number'),
        idnumber: Joi.string().required().label('ID Number'),
        membertype: Joi.string().required().label('Member Type'),
        memberrelation: Joi.string().required().label('Member Relation')
    };

    async populateExtMember(){
        try{
            const extmemberId = this.props.match.params.id;
            if (extmemberId === "new") return;

            const { data: extmember } = await getExtMember(extmemberId);
            this.setState({ data: this.mapToViewModel(extmember) });
        }
        catch(ex){
            if(ex.response && ex.response.status === 404){
                this.props.history.replace("/not-found");
            }
        }
    }

    async componentDidMount(){
        await this.populateExtMember();
    }

    mapToViewModel(extmember){
        return {
            _id: extmember._id,
            firstname: extmember.firstname,
            surname: extmember.surname,
            mmidnumber: extmember.mmidnumber,
            idnumber: extmember.idnumber,
            membertype: extmember.membertype,
            memberrelation: extmember.memberrelation,
        };
    }

    doSubmit = async () => {
        await saveExtMember(this.state.data);

        // this.props.history.push("/member");
    };


    render() { 
        return (
            <div>
                <h1>Branch Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('firstname','Firstname')}
                    {this.renderInput('surname','Surname')}
                    {this.renderInput('mmidnumber','Main Member ID Number')}
                    {this.renderInput('idnumber','ID Number')}
                    {this.renderInput('membertype','Member Type')}
                    {this.renderInput('memberrelation','Member Relation')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
 
export default ExtMemberForm;