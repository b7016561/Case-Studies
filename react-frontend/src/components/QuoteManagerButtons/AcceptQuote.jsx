import { useState, useEffect} from 'react';
import {Button} from 'react-bootstrap';

export default function AcceptQuote(props) {

    const [quote, setQuote] = useState({})

    useEffect(() => {
        setQuote(props);
        
        console.log("Accept Btn Props: " + props);
    },[props.id])

    function handleClick() {

        const quoteResponse = {
            quoteId: quote.id,
            accepted: true
        }
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


    return (
        <Button block size="lg"
        className ="Accept-Button"
        data-testid="AcceptQuoteBtn"
        onClick={handleClick}
        >
        Accept Quote
        </Button> 
    )

}