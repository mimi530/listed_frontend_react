import axios from 'axios';
import React, { useContext, useState } from 'react'
import i18n from '../../i18n';
import { AuthContext } from '../Auth/AuthContext';

export default function Item({list, item, items, setItems}) {

    const [checked, setChecked] = useState(item.bought);
    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(item.name);
    const [description, setDescription] = useState(item.description);
    const [isPending, setIsPending] = useState('');

    const authContext = useContext(AuthContext);

    const handleCheckbox = item => {
        setChecked(!checked)
        const data = {
            bought: !item.bought
        };
        let newItems = items.filter((olditem) => olditem.id !== item.id);
        item.bought = !item.bought;
        if(item.bought) {
            setItems([...newItems, item])
        } else {
            setItems([item, ...newItems])
        }
        axios.patch('lists/'+list.id+'/items/'+item.id, data);
    }

    const handleItemUpdate = (e) => {
        e.preventDefault();
        const data = {
            name: name,
            description: description
        }
        setIsPending(true);
        axios.put(`lists/${list.id}/items/${item.id}`, data).then(
            response => {
                if(response.statusText === 'OK') {
                    let newItems = items.filter((olditem) => olditem.id !== response.data.item.id);
                    setIsPending(false)
                    setEditMode(false)
                    setItems([response.data.item, ...newItems])
                }
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }

    const handleItemDelete = () => {
        if(window.confirm(i18n.t('confirm-delete'))) {
            axios.delete(`lists/${list.id}/items/${item.id}`).then(
                response => {
                    if(response.statusText === 'OK') {
                        let newItems = items.filter((olditem) => olditem.id !== response.data.item.id);
                        setItems(newItems)
                    }
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
            
        }
    }
    
    return (
        <div className="box has-background-dark">
            <p className="has-text-grey is-size-6">
                @{item.user.name}
            </p>
            <div className="is-flex is-justify-content-space-between is-align-items-flex-end">
                {!editMode ? (
                    <h1 className="subtitle has-text-weight-bold has-text-white is-size-3 mb-0" style={!item.bought ? {} : {textDecoration: 'line-through'}}> 
                        {item.name}
                    </h1>
                ): (
                    <form onSubmit={handleItemUpdate}>
                        <div className="field is-horizontal has-addons has-addons-centered">
                            <p className="control">
                                <button className="button is-danger" onClick={() => setEditMode(false)}>
                                    <i className="fa fa-times"></i>
                                </button>
                            </p>
                            <p className={`control ${isPending ? 'is-loading' : ''}`}>
                                <input 
                                    value={name} 
                                    onChange={(e) => setName(e.target.value)} 
                                    name="name" 
                                    className="input is-size-6 has-text-weight-bold subtitle" 
                                    autoFocus
                                />
                            </p>
                            <p className="control">
                                <input 
                                    defaultValue={description} 
                                    onChange={(e) => setDescription(e.target.value)} 
                                    name="description" 
                                    className="input is-size-6 has-text-weight-bold subtitle"
                                    placeholder={i18n.t('description')}
                                />
                            </p>
                            <p className="control">
                                <button type="submit" className={`button is-success ${isPending ? 'is-loading' : ''}`}>
                                    <i className="fa fa-check"></i>
                                </button>
                            </p>
                        </div>
                    </form>
                )}
                <div>
                    {
                        checked ? (
                            <i className="fa fa-check-square is-size-1 has-text-grey click-dark is-clickable" onClick={() => handleCheckbox(item)}></i>
                        ): (
                            <i className="far fa-check-square is-size-1 has-text-light click-dark is-clickable" onClick={() => handleCheckbox(item)}></i>
                        )
                    }
                </div>
            </div>
            {item.user.name === authContext.username && !editMode &&
            <>
                <p className="has-text-grey is-size-5 mb-3">{ item.description }</p>
                <i className="fa fa-edit fa-lg has-text-info click-dark ml-3 mr-5 is-clickable" onClick={() => setEditMode(true)}></i>
                <i className="fa fa-trash fa-lg fa- has-text-danger click-dark is-clickable" onClick={handleItemDelete}></i>
            </>
            }
        </div>
    )
}