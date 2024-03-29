import React, { useState } from 'react'
import i18n from '../i18n'

function Calculator() {

    const [sum, setSum] = useState(0)
    const [price, setPrice] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if(e.target.value === '-') {
            if(price) {
                setSum( prevSum => {
                    return prevSum - price
                })
            }
        } else if(e.target.value === '+') {
            if(price) {
                setSum( prevSum => {
                    return parseFloat(prevSum) + parseFloat(price)
                })
            }
        }
    }

    return (
        <div className="box has-background-dark">
            <p className="has-text-white is-size-6 mb-2 has-text-centered">
                {i18n.t('calculator')}
            </p>
            <>
                <input type="text" value={i18n.t('sum') + sum.toFixed(2) + ' zł'} className="input is-static is-disabled p-4 has-text-right has-background-light"/>
                <div className="columns is-mobile mt-3">
                    <div className="column is-half">
                        <input type="number" className="input" onClick={(e) => {e.target.value=''}} value={price} onChange={(e) => setPrice(e.target.value)} placeholder={i18n.t('item_price')}/>   
                    </div>
                    <div className="column is-one-quarter">
                        <input type="button" value="-" className="button is-danger is-fullwidth" onClick={(e) => handleSubmit(e)}/>
                    </div>
                    <div className="column is-one-quarter">
                        <input type="submit" value="+" className="button is-success is-fullwidth" onClick={(e) => handleSubmit(e)}/>
                    </div>
                </div>
            </>
        </div>
    )
}

export default Calculator
