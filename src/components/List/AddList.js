import axios from 'axios';
import React, { useState } from 'react'
import i18n from '../../i18n';

function AddList({lists, setLists, modal}) {
    
    const [name, setName] = useState('');
    const [isPending, setIsPending] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {name};
        setIsPending(true);
        axios.post('lists', data).then(
            response => {
                if(response.statusText === 'Created') {
                    setLists(prevLists => [
                        response.data.list, ...prevLists 
                    ]);
                }
                setIsPending(false);
                modal(false);
            }
        ).catch(
            error => {
                console.log(error);
                setIsPending(false);
                modal(false);
            }
        )
    }

    return (
        <form onSubmit={handleSubmit}>
            <h3 className="title mb-5 has-text-light">{i18n.t('add_list')}</h3>
            <div className="field">
                <p className="control has-icons-left">
                    <input type="text" name="name" className="input is-medium" placeholder={i18n.t('list_name')} autoFocus value={name} onChange={e => setName(e.target.value)} required/>
                    <span className="icon is-left">
                        <i className="fas fa-list"></i>
                    </span>
                </p>
            </div>
            <div className="field">
                <button className={`button is-success is-medium mt-3 ${isPending ? 'is-loading' : ''}`}>
                {i18n.t('add_list_button')}
                </button>
            </div>
        </form>
    )
}

export default AddList
