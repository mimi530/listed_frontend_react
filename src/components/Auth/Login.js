import axios from 'axios';
import React, { useContext, useState } from 'react'
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import i18n from '../../i18n'
import { AuthContext } from './AuthContext';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPending, setIsPending] = useState(false);

    const authContext = useContext(AuthContext);
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { email, password };
        setIsPending(true);
        axios.post('auth/login', data).then(
            response => {
                console.log('test')
                console.log(response)
                if (response.status === 200) {
                    authContext.setIsAuth(true);
                    console.log('test')
                    authContext.setUsername(response.data.user.name);
                    console.log('test')
                    localStorage.setItem('remember', true);
                    console.log('test')
                    toast.success(response.data.message)
                    console.log('test')
                    return <Redirect to = "/home" / >
                }
            }
        ).catch(
            error => {
                toast.error(error.response.data.message)
                setIsPending(false)
            }
        )
    }

    return ( <
        form onSubmit = { handleSubmit } >
        <
        h3 className = "title mb-5 has-text-light" > { i18n.t('login') } < /h3> <
        div className = "field" >
        <
        p className = "control has-icons-left" >
        <
        input type = "email"
        name = "email"
        className = "input is-medium"
        placeholder = { i18n.t('email') }
        autoFocus autoComplete = "email"
        value = { email }
        onChange = { e => setEmail(e.target.value) }
        required / >
        <
        span className = "icon is-left" >
        <
        i className = "fas fa-envelope" > < /i> < /
        span > <
        /p> < /
        div > <
        div className = "field" >
        <
        p className = "control has-icons-left" >
        <
        input type = "password"
        name = "password"
        className = "input is-medium"
        placeholder = { i18n.t('password') }
        onChange = { e => setPassword(e.target.value) }
        required / >
        <
        span className = "icon is-left" >
        <
        i className = "fas fa-lock" > < /i> < /
        span > <
        /p> < /
        div > <
        div className = "field" >
        <
        button className = { `button is-success is-medium mt-3 ${isPending ? 'is-loading' : ''}` } > { i18n.t('login_button') } <
        /button> < /
        div > <
        /form>
    )
}

export default Login