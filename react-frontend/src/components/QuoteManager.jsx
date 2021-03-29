import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';


export default function QuoteManager(props) {

    const [item, setItem] = useState({});
    const [quote, setQuote] = useState({});


    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) return;

        const currentQuote = props;
        setQuote(currentQuote);

        const itemId = props.itemId;

        axios.get(`CatalogItem/${itemId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then((response) => {

            setItem(response.data)
        })
        .catch(err => console.log(err))        
    
    },[props.id]) // effect is only called when the request id changes

    function AcceptQuote() {
        if(quote.status == "PROCESSED") {
            return (
                <div>
                <Button block size="lg"
                className ="Accept-Button"
                onClick={handleAccept}
                >
                Accept Quote
                </Button> 
                 <Button block size="lg"
                 className="Reject-Button"
                 onClick={handleReject}
                 >
                 Reject Quote
                 </Button> 
                 </div>

            )
        } else { return ( <div></div> ) }
       
    }


    function handleAccept() {

        const quoteResponse = {
            quoteId: quote.id,
            accepted: true
        }
        console.log("quote response " + quoteResponse);
        fetch("quote/quoteResponse", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(quoteResponse)
        }).then((res) =>  { 

            if(res.status == 200) { alert("Quote Accepted")}
            else { alert("Quote Not Accepted!")         
        }}).catch(err =>  console.log(err))
    }

    function handleReject() {
        
        const quoteResponse = {
            quoteId: quote.id,
            accepted: false
        }

        console.log("quote id"+ quoteResponse);

        fetch("quote/quoteResponse", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(quoteResponse)
        }).then((res) =>  { 

            if(res.status == 200) { alert("Quote Rejected")}
            else { alert("Quote Not Rejected!")         
        }}).catch(err =>  console.log(err))
    }
    

    return (    
   
        <div className="Wrapper"> 
            <h3>Quote Details</h3>
            <div className="ItemBox">
                <small style={{fontWeight: 'bold'}}>Item Name</small>
                <p className="">{item.name}</p>
                <small style={{fontWeight: 'bold'}}>Description</small>
                <p className="">{item.description}</p>
                <small style={{fontWeight: 'bold'}}>Supplier</small>
                <p className="">{item.supplierName}</p>
            </div>

            <div className="QuoteBox">
                <small style={{fontWeight: 'bold'}}>Cost</small>
                <p className="">{quote.totalCost}</p>
                <small style={{fontWeight: 'bold'}}>Description</small>
                <p className="">{quote.description}</p>
 
            {/*Renders button to accept quote if the request has been processed*/}
            <AcceptQuote />
           
            </div>
        </div>

    ); 
}