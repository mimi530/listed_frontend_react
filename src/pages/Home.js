import axios from 'axios';
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'

function Home() {

    const [lists, setLists] = useState([]);

    useEffect(() => {
        axios.get('lists').then(
            response => {
                console.log(response)
            }
        ).catch(
            error => {
                console.log(error)
            }
        )
    },[])

    return (
        <>
            <Navbar logged={true}/>
            <main>
                <div className="has-text-light has-background-dark">
                    Hello!
                </div>
            </main>
        </>
    )
}

export default Home
