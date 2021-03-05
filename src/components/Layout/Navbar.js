import React, {useContext, useState} from 'react'
import { Link } from 'react-router-dom';
import { AuthContext } from '../Auth/AuthContext';
import Login from '../Auth/Login';
import Logout from '../Auth/Logout';
import Register from '../Auth/Register';
import i18n from '../../i18n';

function Navbar() {

    const [isNavbar, setIsNavbar] = useState(false);
    const [isModal, setIsModal] = useState(null);
    const [isLang, setIsLang] = useState(false);
    const [userDropdown, setUserDropdown] = useState(false);

    const authContext = useContext(AuthContext);

    const handleLangChange = e => {
        localStorage.setItem('lang', e.target.innerHTML.toLowerCase());
        window.location.reload();
    }

    return (
        <nav className="navbar bg-orange p-2 is-fullwidth" role="navigation">
            <div className="navbar-brand">
                <Link to="/" className="navbar-item has-text-dark is-size-3 has-text-weight-bold">
                    <img src="https://p7.hiclipart.com/preview/115/685/301/computer-icons-checklist-icon-design-list-vector.jpg" alt="logo" className="mr-2"></img>
                    Listed
                </Link>
                <a role="button" className={`navbar-burger ${isNavbar ? 'is-active' : ''}`} data-target="navbarItems" onClick={() => setIsNavbar(!isNavbar)}>
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
            <div id="navbarItems" className={`navbar-menu bg-orange has-text-light
                ${isNavbar ? 'is-active' : ''}`
            }>
                <div className="navbar-end has-text-centered">
                    <div className="navbar-item">
                        <div className={`dropdown is-right ${isLang ? 'is-active' : ''}`}>
                            <div className="dropdown-trigger " onClick={() => setIsLang(!isLang)}>
                                <button className="button lang-picker bg-orange">
                                    <strong>
                                        <i className="fa fa-globe mr-1"></i>
                                        {i18n.language.toUpperCase()}
                                     </strong>
                                    <span className="icon is-small">
                                        <i className="fas fa-angle-down"></i>
                                    </span>
                                </button>
                            </div>
                            <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                <div className="dropdown-content">
                                    <a className="dropdown-item has-text-weight-bold" onClick={handleLangChange}>PL</a>
                                    <a className="dropdown-item has-text-weight-bold" onClick={handleLangChange}>EN</a>
                                </div>
                            </div>
                        </div>
                    </div>
                    { !authContext.isAuth &&
                        <div className="navbar-item">
                            <button className="button is-info" onClick={() => {setIsModal('signup')}}>
                                <strong>{ i18n.t('register_button') }</strong> 
                            </button>
                        </div>
                    }
                    { !authContext.isAuth &&
                        <div className="navbar-item">
                            <button className="button is-success" onClick={() => {setIsModal('log_in')}}>
                                { i18n.t('login_button') }
                            </button> 
                        </div>
                    }
                    { authContext.isAuth &&
                        <div className="navbar-item">
                            <div className={`dropdown is-right ${userDropdown ? 'is-active' : ''}`}>
                                <div className="dropdown-trigger " onClick={() => setUserDropdown(!userDropdown)}>
                                    <button className="button lang-picker bg-orange">
                                        <strong>
                                            <i className="fa fa-user mr-2"></i>
                                            {authContext.username}
                                        </strong>
                                        <span className="icon is-small">
                                            <i className="fas fa-angle-down"></i>
                                        </span>
                                    </button>
                                </div>
                                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div className="dropdown-content">
                                        <Logout/>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className={`modal ${isModal ? 'is-active' : ''}`}>
                <div className="modal-background" onClick={() => {setIsModal(null)}}></div>
                <div className="modal-content box is-rounded has-background-dark py-5 px-5 has-text-centered">
                    {isModal==='signup' && <Register/>}
                    {isModal==='log_in' && <Login/>}
                </div>
            </div>
        </nav>
    )
}

export default Navbar
