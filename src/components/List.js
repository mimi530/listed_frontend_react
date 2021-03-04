import React, { useState } from 'react'
import AddUser from './AddUser';

export default function List({list, show}) {

    const [isModal, setIsModal] = useState(false);

    return (
        <>
        <div className="box bg-orange has-text-dark my-3 is-clickable" onClick={show}>
            {list.items_count ? 
                (
                    <div className="mb-2 has-text-weight-bold">
                        { (list.items_bought_count > 0 ? list.items_bought_count : 0) + ' / ' + list.items_count }
                    </div>
                ) 
                : ''
            }
            <h2 className="subtitle has-text-dark has-text-weight-bold mb-2">
                {list.name}
            </h2>
                
            <p className="is-size-5">
                {list.users.map( 
                    user => {
                        return user.name;
                    })
                    .reduce((prev, curr) => [prev, ', ', curr])
                }
                <button className="is-small button is-success ml-2" title="DODAJ_UZYTKOWNIKA" onClick={() => setIsModal('addList')}><i className="fas fa-plus"></i></button>
            </p>
        </div>
        <div className={`modal ${isModal ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={() => {setIsModal(null)}}></div>
            <div className="modal-content box is-rounded has-background-dark py-5 px-5 has-text-centered">
                {isModal==='addList' && <AddUser list={list}/>}
            </div>
        </div>
        </>
    )
}
