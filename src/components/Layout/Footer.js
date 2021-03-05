import React from 'react'
import i18n from '../../i18n'

function Footer() {
    return (
        <footer className="footer bg-orange has-text-dark has-text-weight-bold pb-6">
            <div className="content has-text-centered">
                <p>2021 &copy; Michał Domżalski. {i18n.t('footer')}</p>
            </div>
        </footer>
    )
}

export default Footer
