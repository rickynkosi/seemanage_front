import React from 'react';
import Joi from 'joi-browser';
// import { useNavigate } from 'react-router-dom';
import Form from '../common/form';
import { login } from '../../services/authService';
import withNavigateHook from './navHook';

class LoginForm extends Form {
    state = {
        data: { username: '', password: '' },
        errors: {}
    };

    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    schema = {
        username: Joi.string().required().label('Username'),
        password: Joi.string().required().label('Password')
    };

    doSubmit = async () => {
        try{
            const { data } = this.state;
            const { navigation } = this.props;
            const { data: jwt } = await login(data.username, data.password);
            // let navigate = useNavigate();
            // navigate('/branch');
            localStorage.setItem('token', jwt);
            navigation('/branch');
            // this.props.history.push('/');
            // console.log('Hi');
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
                <h1>Login</h1>
                <form onSubmit={this.handleSubmit}>
                    {this.renderInput('username', 'Username')}
                    {this.renderInput('password', 'Password', 'password')}
                    {this.renderButton('Login')}
                </form>
            </div>
        );
    }
}

 
export default LoginForm;