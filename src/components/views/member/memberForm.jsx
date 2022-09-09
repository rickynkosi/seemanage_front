import React from 'react';
import Joi from 'joi-browser';
import Form from '../../common/form';
import { getMember, saveMember } from '../../../services/memberService';
// import { getGenres } from '../../services/Service';


class MemberForm extends Form {
    const 
    state = { 
        data: { title: '', firstname: '', lastname: '', idnumber: '', policy: '', physicaladdress: '', phonenumber: '', email: '' },
        // genres: [],
        errors: {}
     }; 

    schema = {
        _id: Joi.string(),
        title: Joi.string().required().label('Title'),
        firstname: Joi.string().required().label('Firstname'),
        lastname: Joi.string().required().min(0).max(100).label('Lastname'),
        idnumber: Joi.number().required().min(0).max(10).label(' ID Number'),
        policy: Joi.string().required().min(0).max(10).label(' Policy'),
        physicaladdress: Joi.string().required().min(0).max(10).label(' Physcial Address'),
        phonenumber: Joi.number().required().min(0).max(10).label(' Phonenumber'),
        email: Joi.string().required().email().min(0).max(10).label(' Email'),
    };

    async populateMember(){
        try{
            const memberId = this.props.match.params.id;
            if (memberId === "new") return;

            const member = await getMember(memberId);
            this.setState({ data: this.mapToViewModel(member) });
        }
        catch(ex){
            if(ex.response && ex.response.status === 404){
                this.props.history.replace("/not-found");
            }
        }
    }

    async componentDidMount(){
        await this.populateMember();
    }

    mapToViewModel(member){
        return {
            _id: member._id,
            title: member.title,
            firstname: member.firstname,
            lastname: member.lastname,
            idnumber: member.idnumber,
            policy: member.policy,
            physicaladdress: member.physicaladdress,
            phonenumber: member.phonenumber,
            email: member.email
        };
    }

    doSubmit =  async () => {
        await saveMember(this.state.data);

        this.props.history.push("member");
    };


    render( ) { 
        return (
            <div>
                <h1>Member Form</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('title','Title')}
                    {this.renderInput('firstname','Firstname')}
                    {this.renderInput('lastname','Lastname')}
                    {this.renderInput('idnumber','ID Number')}
                    {this.renderInput('policy','Policy')}
                    {this.renderInput('physicaladdress','Physical Addres')}
                    {this.renderInput('phonenumber','Phonenumber')}
                    {this.renderInput('email','Email')}
                    {this.renderButton('Save')}
                </form>
            </div>
        );
    }
}
 
export default MemberForm;