import axios from 'axios';
import React, {useState, useEffect} from 'react';
import AcceptQuote from '../components/QuoteManagerButtons/AcceptQuote';
import RejectQuote from '../components/QuoteManagerButtons/RejectQuote';

export default function QuoteManager(props) {

    const [item, setItem] = useState({});
    const [quote, setQuote] = useState({});


    useEffect(() => {

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

    function LoadButtons() {
        if(quote.status === "PROCESSED") {
            return (
                <div>
                    <AcceptQuote {...quote}/>
                    <RejectQuote {...quote}/>
              
                 </div>

            )
        } else { return ( <div></div> ) }
       
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
            <LoadButtons />
           
            </div>
        </div>

    ); 
}