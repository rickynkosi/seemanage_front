import React from 'react';
import { useNavigate } from 'react-router-dom';
import LoginForm from './login';

const withNavigateHook = () => {
    return ( props ) => {
        const navigation = useNavigate();
        return <LoginForm navigation={navigation} {...props}/>
    };
}
 
export default withNavigateHook;