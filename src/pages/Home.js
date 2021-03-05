import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import AddList from '../components/List/AddList';
import { AuthContext } from '../components/Auth/AuthContext';
import Item from '../components/Item/Item';
import List from '../components/List/List';
import Navbar from '../components/Layout/Navbar'
import i18n from '../i18n';

function Home() {

    const [lists, setLists] = useState([]);
    const [list, setList] = useState(null);
    const [items, setItems] = useState([]);
    const [isModal, setIsModal] = useState();
    const [showItems, setShowItems] = useState(false);
    const [name, setName] = useState('');

    const authContext = useContext(AuthContext);

    useEffect(() => {
        axios.get('lists').then(
            response => {
                setLists(response.data)
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    }, [items])

    const showListItems = id => {
        setShowItems(true)
        axios.get('lists/'+id).then(
            response => {
                if(response.statusText === 'OK') {
                    setList(response.data.list)
                    setItems(response.data.items)
                }
            }
        ).catch(
            error => {
                console.log(error);
                setShowItems(false)
            }
        )
    }

    const handleAddItem = (e) => {
        e.preventDefault();
        const item = {
            name: name,
            user: {
                name: authContext.username
            }
        }
        setItems(prevItems => [
            item,
            ...prevItems
        ])
        setName('')
        e.target[0].focus();
        axios.post(`lists/${list.id}/items`, item).then(
            response => {
                if(response.statusText === 'Created') {
                    axios.get(`lists/${list.id}`).then(
                        response => {
                            if(response.statusText === 'OK') {
                                setItems(response.data.items)
                            }
                            //TODO figure out a way to reduce renders
                        }
                    )
                }
            }
        );
    }

    return (
        <>
            <Navbar/>
            <main>
                <div className="columns p-3">
                    <section className="column is-3-desktop is-6-tablet">
                        <h1 className="title has-text-light has-text-centered">
                            {i18n.t('lists')}
                        </h1>
                        <button className="button is-success is-fullwidth is-centered is-large" onClick={() => {setIsModal('addList')}}>
                            <i className="fa fa-plus mr-2"></i>
                        </button>
                        { lists && lists.map((list) => {
                            return <List 
                                key={list.id} 
                                list={list} 
                                show={() => showListItems(list.id)} 
                                onClick={() => setShowItems(!showItems)} 
                                setLists={setLists} 
                                lists={lists}
                                setList={setList}
                            />
                        }
                        )}
                    </section>
                    <section className="column has-text-light container is-6">
                        {list && (
                        <>
                            <h1 className="title has-text-light has-text-centered">
                                {list.name}
                            </h1>
                            <form onSubmit={handleAddItem} className="mb-5">
                                <div className="field has-addons is-expanded">
                                    <p className="control is-expanded">
                                        <input className="input is-large" type="text" placeholder={i18n.t('add_item')} value={name} onChange={(e) => setName(e.target.value)}/>
                                    </p>
                                    <div className="control">
                                        <button type="submit" className="button is-success is-large" title={i18n.t('add_item')}>
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </>
                        )}
                        { list && 
                            items.map((item) => {
                                return <Item key={item.id} list={list} item={item} items={items} setItems={setItems}/>
                            })
                        }
                    </section>
                </div>
                <div className={`modal ${isModal ? 'is-active' : ''}`}>
                    <div className="modal-background" onClick={() => {setIsModal(null)}}></div>
                    <div className="modal-content box is-rounded has-background-dark py-5 px-5 has-text-centered">
                        {isModal==='addList' && <AddList lists={lists} setLists={setLists} modal={setIsModal}/>}
                    </div>
                </div>
            </main>
        </>
    )
}

export default Home
