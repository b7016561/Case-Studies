import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';

export default function QuoteRequestManager(props) {

    // store a reference to the input on DOM

    const [request, setRequest] = useState({});
    const [quote, setQuote] = useState({})


    useEffect(() => {

        const currentRequest = props;
        setRequest(currentRequest);

        const id = props.id;

        /*axios.get(`/Quote${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {

            if(res.status == 200) {
                console.log("Quote recieved??")
               setQuote(res.data);
            } else { console.log("quote not recieved ")} 

        }).catch((err) => console.log(err))*/
    
    },[props.id]) // effect is only called when the request id changes


      function handleClick() {
         
        setQuote({...quote,
            itemId: request.itemId,
            username: request.username,
        })
       

        axios.post('quote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(quote)
        }).then((res) => {

            if(res.status == 200) { alert("Quote Created")}
            else { alert("Quote Not Created!")}

        }).catch(err =>  console.log(err))
   }

    // Access handler, this will render action buttons depending on account type and ticket status
    /*function Access() {
        
        if(accountType == "Admin") { return <AdminControls {...ticket} />; }
        else if(accountType == "Support") { return <SupportControls {...ticket}/>; }
        else { return <UserControls {...ticket} />; }

    }*/

    return (    
   
        <div>
            <h4>Quote Manager</h4>  
            
                <p className="">Id: <span className="QuoteValue"> {request.id} </span></p>
                <p className="">ItemId: <span className="QuoteValue"> {request.itemId} </span></p>
                <p className="">Request Username: <span className="QuoteValue"> {request.username} </span></p>

                <input type='text'
                placeholder='total cost'
                name="totalCost"
                onChange={(e) => setQuote({...quote, totalCost: e.target.value})} // calling state handler and passing text value
                defaultValue={quote.totalCost}  // state variable 
                className='Input'
                />

                <input type='text'
                placeholder='description'
                name="description"
                onChange={(e) => setQuote({...quote, description: e.target.value})} // calling state handler and passing text value
                defaultValue={quote.description}  // state variable 
                className='Input'
                />

                <button
                onClick={handleClick}
                >Create Quote
                </button>
        </div>
    ); 
}