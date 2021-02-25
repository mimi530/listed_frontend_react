import i18next from 'i18next'
import React, {useState} from 'react'
import i18n from '../i18n'

function Navbar() {

    const [isActive, setIsActive] = useState(false);

    const handleClick = () => {  
        setIsActive(!isActive);
    }

    return (
        <nav className="navbar bg-orange p-2" role="navigation">
            <div className="navbar-brand">
                <a className="navbar-item has-text-dark is-size-3 has-text-weight-bold">
                    <img src="https://p7.hiclipart.com/preview/115/685/301/computer-icons-checklist-icon-design-list-vector.jpg" className="mr-2"></img>
                    Listed
                </a>
                <a role="button" className={`navbar-burger ${isActive ? 'is-active' : ''}`} data-target="navbarItems" onClick={handleClick}>
                    <span></span>
                    <span></span>
                    <span></span>
                </a>
            </div>
            <div id="navbarItems" className={`navbar-menu bg-orange has-text-light  
                ${isActive ? 'is-active' : ''}`
            }>
                <div className="navbar-end has-text-centered">
                    <div className="navbar-item">
                        <a className="button is-light">
                            <strong>{ i18n.t('register') }</strong> 
                        </a>
                    </div>
                    <div className="navbar-item">
                        <a className="button is-dark">
                            { i18n.t('login') }
                        </a>
                    </div>
                </div>
            </div>   
        </nav>
    )
}

export default Navbar
