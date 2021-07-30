import axios from 'axios';
import React, { useState } from 'react'
import { Spring } from 'react-spring/renderprops';
import { toast } from 'react-toastify';
import i18n from '../../i18n';
import AddUser from './AddUser';

export default function List({list, show, setLists, lists, setList}) {

    const [isModal, setIsModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(list.name);
    const [isPending, setIsPending] = useState(false);

    const handleListEdit = (e) => {
        e.preventDefault();
        const data = {
            name: name
        }
        setIsPending(true)
        axios.patch(`lists/${list.id}`, data).then(
            response => {
                if(response.status === 200) {
                    toast.success(response.data.message)
                    setList(response.data.list)
                    setEditMode(false)
                    setIsPending(false)
                }
            }
        ).catch(
            error => {
                toast.error(error.response.data.message)
                setIsPending(false)
            }
        )
        
    }

    const handleListDelete = () => {
        if(window.confirm(i18n.t('confirm-delete'))) {
            axios.delete(`lists/${list.id}`).then(
                response => {
                    if(response.status === 200) {
                        toast.success(response.data.message)
                        setList(null)
                        let newLists = lists.filter((oldlist) => oldlist.id !== list.id)
                        setLists(newLists)
                    }
                }
            ).catch(
                error => {
                    toast.error(error.response.data.message)
                }
            )
            
        }
    }

    return (
        <>
        <div className="box bg-orange has-text-dark my-3 is-clickable" onClick={show}>
            {list.items_count ? 
                (
                    <div className="mb-1 has-text-weight-bold">
                        { (list.items_bought_count > 0 ? list.items_bought_count : 0) + ' / ' + list.items_count }
                    </div>
                ) 
                : ''
            }
            
                {editMode ? (
                    <form onSubmit={handleListEdit}>
                        <div className="field has-addons">
                            <p className={`control ${isPending ? 'is-loading' : ''}`}>
                                <input value={name} onChange={(e) => setName(e.target.value)} name="name" className="input has-text-weight-bold subtitle is-6 is-size-6" autoFocus/>
                            </p>
                            <p className="control">
                                <button type="submit" className="button is-success">
                                    <i className="fa fa-check"></i>
                                </button>
                            </p>
                            <p className="control">
                                <button className="button is-danger" onClick={() => setEditMode(false)}>
                                    <i className="fa fa-times"></i>
                                </button>
                            </p>
                        </div>
                    </form>
                ): (
                    <div className="is-flex is-justify-content-space-between">
                        <h2 className="subtitle has-text-dark has-text-weight-bold mb-2">
                            {list.name}
                        </h2>
                        <div>
                            <i className="fa fa-edit has-text-info click-dark mr-2" onClick={() => setEditMode(true)}></i>
                            <i className="fa fa-trash has-text-danger click-dark" onClick={handleListDelete}></i>
                        </div>
                    </div>
                )}
            
            <div className="is-flex">
                <div className="mr-2 is-clickable" title={i18n.t('add_user_button')} onClick={() => setIsModal('addList')}>
                    <i className="fas fa-plus click-dark has-text-link"></i>
                </div>
                {list.users.map( 
                    user => {
                        return user.name;
                    }).reduce((prev, curr) => [prev, ', ', curr])
                }
            </div>
        </div>
        <div className={`modal ${isModal ? 'is-active' : ''}`}>
            <div className="modal-background" onClick={() => {setIsModal(null)}}></div>
            <div className="modal-content box is-rounded has-background-dark py-5 px-5 has-text-centered">
                {isModal==='addList' && <Spring
                        from={{opacity: 0}}
                        to={{opacity: 1}}
                        config={{duration: 700}}
                    >
                        {props => (
                            <div style={props}>
                                <AddUser list={list} setIsModal={setIsModal}/>
                            </div>
                        )}
                    </Spring>
                }
            </div>
        </div>
        </>
    )
}
