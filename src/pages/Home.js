import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import AddList from '../components/AddList';
import { AuthContext } from '../components/AuthContext';
import Item from '../components/Item';
import List from '../components/List';
import Navbar from '../components/Navbar'

function Home() {

    const [lists, setLists] = useState([]);
    const [list, setList] = useState([]);
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
    }, [])

    const showListItems = id => {
        axios.get('lists/'+id).then(
            response => {
                if(response.statusText === 'OK') {
                    setList(response.data.list)
                    setItems(response.data.items)
                    setShowItems(true)
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
        console.log(e)
        const item = {
            name: name,
            user: {
                name: authContext.username
            }
        }
        axios.post(`lists/${list.id}/items`, item);
        setItems(prevItems => [
            item,
            ...prevItems
        ])
        setName('')
    }

    return (
        <>
            <Navbar/>
            <main>
                <div className="columns p-3">
                    <section className="column is-one-fifth">
                        <h1 className="title has-text-light has-text-centered">
                            TWOJE_LISTY
                        </h1>
                        <button className="button is-success is-fullwidth is-centered is-large" onClick={() => {setIsModal('addList')}}>
                            <i className="fa fa-plus mr-2"></i>
                        </button>
                        { lists.length>0 && lists.map((list) => {
                            return <List key={list.id} list={list} show={() => showListItems(list.id)} onClick={() => setShowItems(!showItems)}/>
                        }
                        )}
                    </section>
                    <section className="column has-text-light container is-5">
                        {showItems && (
                        <>
                            <h1 className="title has-text-light has-text-centered">
                                {list.name}
                            </h1>
                            <form onSubmit={handleAddItem} className="mb-5">
                                <div className="field has-addons is-expanded">
                                    <p className="control is-expanded">
                                        <input className="input is-large" type="text" placeholder="DODAJ_PRZEDMIOT" value={name} onChange={(e) => setName(e.target.value)}/>
                                    </p>
                                    <div className="control">
                                        <button type="submit" className="button is-success is-large">
                                            <i className="fa fa-plus"></i>
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </>
                        )}
                        { showItems && 
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
