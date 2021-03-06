import axios from 'axios';
import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify';
import i18n from '../../i18n'
import { AuthContext } from './AuthContext';

export default function Logout() {

    const authContext = useContext(AuthContext);

    const handleLogout = e => {
        e.preventDefault();
        axios.post('auth/logout').then(
            response => {
                toast.success(response.data.message)
                authContext.setIsAuth(false);
                authContext.setUsername('');
                localStorage.removeItem('remember');
            }
        ).catch(
            error => {
                toast.error(error.response.data.message)
            }
        )
    }

    return (
        <Link to="/" className="dropdown-item has-text-weight-bold" onClick={handleLogout}>
            <i className="fa fa-sign-out-alt mr-2"></i>
            { i18n.t('logout') }
        </Link> 
    )
}
