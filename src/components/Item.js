import axios from 'axios';
import React, { useState } from 'react'

export default function Item({list, item, items, setItems}) {

    const [checked, setChecked] = useState(item.bought);

    const handleCheckbox = item => {
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
    
    return (
        <div className="box has-background-grey is-flex is-flex-direction-row">
            <div className="is-inline-block">
                <div className="mb-3">
                    { <h1 className="subtitle has-text-white is-size-3 is-inline" style={!item.bought ? {} : {textDecoration: 'line-through'}}> {item.name} </h1> }
                    { 
                        <p className="ml-2 is-inline has-text-dark is-size-6">
                            @{item.user.name}
                        </p>
                    }
                </div>
                
                <p className="has-text-white is-size-5">{ item.description }</p>
            </div>
            <div className="is-inline-block" style={{marginLeft: 'auto'}}>
                <input type="checkbox" checked={checked} onChange={() => setChecked(!checked)} style={checkboxStyles} onClick={() => handleCheckbox(item)}/>
            </div>
        </div>
    )
}
const checkboxStyles = {
    width: '30px',
    height: '30px',
    border: '1px solid black',
    borderRadius: '10px',
}