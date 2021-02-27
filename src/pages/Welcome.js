import React from 'react'
import Navbar from '../components/Navbar'
import '@fortawesome/fontawesome-free/css/all.min.css'
import phone from '../img/phone.png'
import Footer from '../components/Footer'
import i18n from '../i18n'

function Welcome() {
    return (
        <>
            <Navbar/>
            <main className="has-background-dark">
                <div className="container">
                    <div className="columns is-vcentered has-text-centered">
                        <section className="column p-6">
                            <h1 className="title is-size-1 orange">
                                {i18n.t('title')}
                            </h1>
                            <p className="subtitle is-size-3 has-text-white">
                                {i18n.t('subtitle')}
                            </p>
                        </section>
                        <section className="column">
                            <h1 className="is-size-1 subtitle mt-6 orange">
                                {i18n.t('mobile-app')}&nbsp;
                                <span className="icon-text">
                                    <i className="fas fa-arrow-down"></i>
                                </span>
                            </h1>
                            <img src={phone} alt="mobile app" className="mb-5"></img>
                        </section>
                    </div>
                </div>
            </main>
            <Footer/>
        </>
    )
}

export default Welcome
