import React from 'react';
import  Joi  from 'joi-browser';
import Form from '../common/form';
import * as userService from '../../services/userService';

class RegisterForm extends Form {
    state = { 
        data: { fullname: '', email: '', phonenumber: '',  username: '', password: '', },
        errors: {}
     };
    
    schema = {
        fullname: Joi.string().required().label('Fullname'),
        email: Joi.string().required().email().label('Email'),
        phonenumber: Joi.string().required().label('Phonenumber'),
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().min(5).label('Password')
    };

    doSubmit = async () => {
        try{
            await userService.register(this.state.data);
        }
        catch(ex){
            if (ex.response && ex.response.status === 400){
                const errors = { ...this.state.errors };
                errors.username = ex.response.data;
                this.setState({ errors });
            }
        }
    };

    render() { 
        return (
            <div className="col-3">
                <h1>Register</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('fullname','Fullname')}
                    {this.renderInput('email','Email')}
                    {this.renderInput('phonenumber','Phone Number')}
                    {this.renderInput('username','Username')}
                    {this.renderInput('password','Password','password')}
                    {this.renderButton('Register')}
                </form>
            </div>
        );
    }
}
 
export default RegisterForm;