import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';

export default function QuoteRequestManager(props) {

    const [request, setRequest] = useState({});
    const [description, setDescription] = useState();
    const [cost, setCost] = useState("");
    const [item, setItem] = useState({});


    useEffect(() => {

        const currentRequest = props;
        setRequest(currentRequest);

        //console.log(request)
        const itemId = props.itemId;

        console.log("itemID" + itemId);
        axios.get(`CatalogItem/${itemId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then((response) => {
            console.log(response)
            setItem(response.data)
        })
        .catch(err => console.log(err))        
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
         

        const quote = {
            id: request.id,
            itemId: request.itemId,
            username: request.username,
            totalCost: parseInt(cost),
            description: description
        }
       
        console.log(quote);
       
        fetch('quote', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(quote)
        }).then((res) => {

            if(res.status == 200) { alert("Quote Created")}
            else { alert("Quote Not Created!")}

        }).catch(err =>  console.log(err))
        /*axios.post('quote', {
            headers: {
               
            },
            data: JSON.stringify(quote)
        }).then((res) => {

            if(res.status == 200) { alert("Quote Created")}
            else { alert("Quote Not Created!")}

        }).catch(err =>  console.log(err))*/
   }

    // Access handler, this will render action buttons depending on account type and ticket status
    /*function Access() {
        
        if(accountType == "Admin") { return <AdminControls {...ticket} />; }
        else if(accountType == "Support") { return <SupportControls {...ticket}/>; }
        else { return <UserControls {...ticket} />; }

    }*/

    return (    
   
        <div>
            <div>
                <p className="">Item Name: <span className="QuoteValue"> {item.name} </span></p>
                <p className="">Cost: <span className="QuoteValue"> {item.description} </span></p>
                <p className="">Description: <span className="QuoteValue"> {item.cost} </span></p>
                <p className="">Supplier: <span className="QuoteValue"> {item.supplierName} </span></p>

            </div>
            <div>
                <h4>Create Quote</h4>  

                    {/*<p className="">Id: <span className="QuoteValue"> {request.id} </span></p>*/}
                   {/*} <p className="">ItemId: <span className="QuoteValue"> {request.itemId} </span></p>*/}
                    {/*<p className="">Request Username: <span className="QuoteValue"> {request.username} </span></p>*/}

                    <input type='text'
                    placeholder='total cost'
                    name="totalCost"
                    onChange={(e) => setCost(e.target.value)} // calling state handler and passing text value
                    defaultValue={cost}  // state variable 
                    className='Input'
                    />

                    <input type='text'
                    placeholder='description'
                    name="description"
                    onChange={(e) => setDescription(e.target.value)} // calling state handler and passing text value
                    defaultValue={description}  // state variable 
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