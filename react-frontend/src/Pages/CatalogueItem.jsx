import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios';
export default function CatalogueItem(props) {


    const history = useHistory();
    // login obj
    const [item, setItem] = useState({});
    const [requested, setRequested] = useState("");

 
    useEffect(() => {
        const item = props;
        setItem(item)
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');

        axios.get(`CatalogItem/${id}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then((response) => {
                setItem(response.data);
            })  
        .catch(err => history.push('/login'))

    },[])
    
    function RequestQuote() {

        fetch("QuoteRequest", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: item.id
        })
        .then((response) => {
            if(response.status === 200) { setRequested("Quote Requested!") }
            else { setRequested("Quote Not Requested!") } 
        })
        .catch(err => console.log(err))  
    }

    return (

        <div className='Component'>

            <h4>{item.name}</h4>

            <button
            onClick={RequestQuote}
            >Request Quote
            </button>
            <small>{requested}</small>

            <p>{item.description}</p>
            <p>{item.cost}</p>

        </div> 
    )
}