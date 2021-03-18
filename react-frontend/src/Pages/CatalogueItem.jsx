import React, {useState, useEffect} from 'react';
import {useHistory} from 'react-router-dom'
import axios from 'axios';
import {Button} from 'react-bootstrap';

export default function CatalogueItem(props) {

    const history = useHistory();
    const [item, setItem] = useState({});
 
    useEffect(() => {

        setItem(props)
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
        const itemId ={
            itemId: item.id
        }

        console.log(JSON.stringify(itemId))
        fetch('quoteRequest', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(itemId)
        }).then((res) => {

            if(res.status == 200) { alert("Request Created")}
            else { alert("Requested Not Created!")}

        }).catch(err =>  console.log(err))
    }

    return (
        <div className='Component'>
            <div className="Wrapper">
                <div className="ItemBox">

                    <h4>{item.name}</h4>
                    <p>{item.description}</p>
                    <p>{item.cost}</p>

                    <Button block size="lg" 
                    onClick={RequestQuote}
                    >Request Quote
                    </Button>

                </div>
            </div>
        </div> 
    )
}