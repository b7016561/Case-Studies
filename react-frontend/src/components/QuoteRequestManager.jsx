import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';

export default function QuoteRequestManager(props) {

    // store a reference to the input on DOM
    //const inputRef = useRef();
    const [request, setRequest] = useState({});
    const [quote, setQuote] = useState({})

    useEffect(() => {

        const currentRequest = props;
        setRequest(currentRequest);

        const id = props.id;

        axios.get(`/Quote${id}`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        }).then((res) => {

            if(res.status == 200) {
               setQuote(res.data);
            } else { alert("No quote found") } 

        }).catch((err) => console.log(err))
    
    },[props.id]) // effect is only called when the request id changes


   async function handleClick() {
       
        await setQuote({...quote,
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
   
        <div style={{
            backgroundColor: '#282c34'
            
        }}>
            <h4><code>Quote Manager</code></h4>  
            {/* Access component, which will provide action bar of avaliable actions depending on account type */}
            
                <div className="QuoteManager"> 
                <p className="QuoteProperty">Id: <span className="QuoteValue"> {request.id} </span></p>
                <p className="QuoteProperty">ItemId: <span className="QuoteValue"> {request.itemId} </span></p>
                <p className="QuoteProperty">Request Username: <span className="QuoteValue"> {request.username} </span></p>

                <input type='text'
                //ref={inputRef} // sotring this input node in inputRef
                onChange={(e) => setQuote({...quote, totalCost: e.target.value})}  // calling state handler and passing text value
                //autoFocus // auto focus so when page re-renders it focuses on this text box..
                defaultValue={quote.totalCost}  // state variable 
                className='Input'                          
                />  

                <input type='text'
                //ref={inputRef} // sotring this input node in inputRef
                onChange={(e) => setQuote({...quote, description: e.target.value})}  // calling state handler and passing text value
                //autoFocus // auto focus so when page re-renders it focuses on this text box..
                defaultValue={quote.description}  // state variable 
                className='Input'                          
                />  

                <button
                onClick={handleClick}
                >Create Quote
                </button>
                
            </div>
        </div>
    ); 


}