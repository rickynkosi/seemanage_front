import React from 'react';
import Joi from 'joi-browser';
import Form from '../../common/form';
import { getUser, updateUser } from '../../../services/userService';
// import { getPolicies } from '../../services/policyService';


class UserForm extends Form {
    const 
    state = { 
        data: { fullname: '', email: '', phoneNumber: '' , username: '', password: '', isAdmin:'' },
        // policies: [],
        errors: {}
     }; 

    schema = {
        _id: Joi.string(),
        fullname: Joi.string().required().label('Fullname'),
        email: Joi.string().required().min(0).max(100).email().label('Email'),
        phonenumber: Joi.string().required().min(0).max(100).email().label('Phone Number'),
        username: Joi.string().required().min(0).max(10).label('Username'),
        password: Joi.string().required().min(0).max(255).label('Password'),
        isAdmin: Joi.boolean().label('IsAdmin'),
    };

    // async populatePolicies(){
    //     const { data: genres } = await getPolicies();
    //     this.setState({  genres });
    // }

    async populateUser(){
        try{
            const userId = this.props.match.params.id;
            if (userId === "new") return;

            const { data: user } = await getUser(userId);
            this.setState({ data: this.mapToViewModel(user) });
        }
        catch(ex){
            if(ex.response && ex.response.status === 404){
                this.props.history.replace("/not-found");
            }
        }
    }

    async componentDidMount(){
        // await this.populatePolicies();
        await this.populateUser();
        
    }

    mapToViewModel(user){
        return {
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            phonenumber: user.phonenumber,
            username: user.username,
            password: user.password,
            isAdmin: user.isAdmin
        };
    }

    doSubmit = async () => {
        await updateUser(this.state.data);

        this.props.history.push("/users");
    };


    render( ) { 
        return (
            <div>
                <h1>Users Form</h1>
                {this.renderInput('fullname','Fullanme')}
                {this.renderInput('email','Email')}
                {this.renderInput('phonenumber','Phone Number')}
                {this.renderInput('username','Username')}
                {this.renderInput('password','Password')}
                {this.renderInput('isAdmin','isAmin')}
                {this.renderButton('Save')}
            </div>
        );
    }
}
 
export default UserForm;