import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import AddList from '../components/List/AddList';
import { AuthContext } from '../components/Auth/AuthContext';
import Item from '../components/Item/Item';
import List from '../components/List/List';
import Navbar from '../components/Layout/Navbar'
import i18n from '../i18n';
import { toast } from 'react-toastify';
import { Spring } from 'react-spring/renderprops';
import Calculator from '../components/Calculator';

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
                toast.error(error.response.data.message)
            }
        )
    }, [list])

    const showListItems = id => {
        setShowItems(true)
        axios.get('lists/' + id).then(
            response => {
                if (response.status === 200) {
                    setList(response.data.list)
                    setItems(response.data.items)
                }
            }
        ).catch(
            error => {
                toast.error(error.response.data.message)
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
        axios.post(`lists/${list.id}/items`, item).catch(
            error => {
                toast.error(error.response.data.message)
            }
        );
    }

    return ( <
        >
        <
        Navbar / >
        <
        main >
        <
        div className = "columns p-3" >
        <
        section className = "column is-3-desktop is-6-tablet" >
        <
        h1 className = "title has-text-light has-text-centered" > { i18n.t('lists') } <
        /h1> <
        button className = "button is-success is-fullwidth is-centered is-large"
        onClick = {
            () => { setIsModal('addList') }
        } >
        <
        i className = "fa fa-plus mr-2" > < /i> < /
        button > {
            lists && lists.map((list) => {
                return <Spring
                from = {
                    { opacity: 0 }
                }
                to = {
                    { opacity: 1 }
                }
                config = {
                        { duration: 700 }
                    } > {
                        props => ( <
                            div style = { props } >
                            <
                            List key = { list.id }
                            list = { list }
                            show = {
                                () => showListItems(list.id)
                            }
                            onClick = {
                                () => setShowItems(!showItems)
                            }
                            setLists = { setLists }
                            lists = { lists }
                            setList = { setList }
                            /> < /
                            div >
                        )
                    } <
                    /Spring>
            })
        } <
        /section> <
        section className = "column has-text-light container is-6" > {
            list && ( <
                >
                <
                h1 className = "title has-text-light has-text-centered" > { list.name } <
                /h1> <
                Spring from = {
                    { opacity: 0 }
                }
                to = {
                    { opacity: 1 }
                }
                config = {
                    { duration: 700 }
                } > {
                    props => ( <
                        div style = { props } >
                        <
                        form onSubmit = { handleAddItem }
                        className = "mb-5" >
                        <
                        div className = "field has-addons is-expanded" >
                        <
                        p className = "control is-expanded" >
                        <
                        input className = "input is-large"
                        type = "text"
                        placeholder = { i18n.t('add_item') }
                        value = { name }
                        onChange = {
                            (e) => setName(e.target.value)
                        }
                        /> < /
                        p > <
                        div className = "control" >
                        <
                        button type = "submit"
                        className = "button is-success is-large"
                        title = { i18n.t('add_item') } >
                        <
                        i className = "fa fa-plus" > < /i> < /
                        button > <
                        /div> < /
                        div > <
                        /form> < /
                        div >
                    )
                } <
                /Spring>

                <
                />
            )
        } { list && < Calculator / > } {
            list &&
                items.map((item) => {
                    return <Spring
                    from = {
                        { opacity: 0 }
                    }
                    to = {
                        { opacity: 1 }
                    }
                    config = {
                            { duration: 700, delay: 200 }
                        } > {
                            props => ( <
                                div style = { props }
                                className = "mb-5" >
                                <
                                Item key = { item.id }
                                list = { list }
                                item = { item }
                                items = { items }
                                setItems = { setItems }
                                /> < /
                                div >
                            )
                        } <
                        /Spring>
                })
        } <
        /section> < /
        div > <
        div className = { `modal ${isModal ? 'is-active' : ''}` } >
        <
        div className = "modal-background"
        onClick = {
            () => { setIsModal(null) }
        } > < /div> <
        div className = "modal-content box is-rounded has-background-dark py-5 px-5 has-text-centered" > {
            isModal === 'addList' &&
            <
            Spring
            from = {
                { opacity: 0 }
            }
            to = {
                { opacity: 1 }
            }
            config = {
                { duration: 700 }
            } > {
                props => ( <
                    div style = { props } >
                    <
                    AddList lists = { lists }
                    setLists = { setLists }
                    modal = { setIsModal }
                    /> < /
                    div >
                )
            } <
            /Spring>
        } <
        /div> < /
        div > <
        /main> < /
        >
    )
}

export default Home