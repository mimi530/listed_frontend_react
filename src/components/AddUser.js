import axios from 'axios';
import React, { useState } from 'react'
import i18n from '../i18n';

export default function AddUser({list}) {

    const [email, setEmail] = useState('');
    const [isPending, setIsPending] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {email};
        setIsPending(true);
        axios.patch(`lists/${list.id}`, data).then(
            response => {
                if(response.statusText === 'OK') {
                    setIsPending(false);
                }
            }
        ).catch(
            error => {
                console.log(error);
                setIsPending(false);
            }
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="title mb-5 has-text-light">ADD_USER</h3>
            <div className="field">
                <p className="control has-icons-left">
                    <input type="email" name="email" className="input is-medium" placeholder={i18n.t('email')} autoFocus value={email} onChange={e => setEmail(e.target.value)} required/>
                    <span className="icon is-left">
                        <i className="fas fa-envelope"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <button className={`button is-success is-medium mt-3 ${isPending ? 'is-loading' : ''}`}>
                    DODAJ_LISTE
                </button>
            </div>
        </form>
    )
}
