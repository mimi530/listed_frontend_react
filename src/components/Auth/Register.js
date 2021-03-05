import axios from 'axios';
import React, { useState } from 'react'
import i18n from '../../i18n'

function Register() {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsPending(true);
        const data = {name, email, password, password_confirmation};
        axios.post('auth/register', data)
        .then(response => {
            console.log(response.data)
            setIsPending(false)
        }).catch(e => {
            console.log(e);
            setIsPending(false);
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="title mb-5 has-text-light">{i18n.t('register')}</h3>
            <div className="field">
                <p className="control has-icons-left">
                    <input name="name" type="text" className="input is-medium" placeholder={i18n.t('username')} autoComplete="name" value={name} onChange={e => setName(e.target.value)} required/>
                    <span className="icon is-left">
                        <i className="fas fa-user"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input name="email" type="email" className="input is-medium" placeholder={i18n.t('email')} autoComplete="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                    <span className="icon is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input name="password" type="password" className="input is-medium" placeholder={i18n.t('password')} value={password} onChange={e => setPassword(e.target.value)} required/>
                    <span className="icon is-left">
                        <i className="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control has-icons-left">
                    <input name="password_confirmation" type="password" className="input is-medium" placeholder={i18n.t('password_confirm')} value={password_confirmation} onChange={e => setPasswordConfirmation(e.target.value)} required/>
                    <span className="icon is-left">
                        <i className="fas fa-lock"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <p className="control">
                    <button className={`button is-success is-medium mt-3 ${isPending ? 'is-loading' : ''}`}>
                        {i18n.t('register_button')}
                    </button>
                </p>
            </div>
        </form>
    )
}

export default Register
