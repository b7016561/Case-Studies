import axios from 'axios';
import React, {useState, useEffect, useRef} from 'react';
import {Form, Button} from 'react-bootstrap';
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

        //console.log("itemID" + itemId);
        axios.get(`CatalogItem/${itemId}`,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        })
        .then((response) => {
            //console.log(response)
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


      function onSubmit(event) {
         event.preventDefault(); // stopping form refreshing page.

        const quote = {
            id: request.id,
            itemId: request.itemId,
            username: request.username,
            totalCost: parseInt(cost),
            description: description
        }
       
        //console.log(quote);
       
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
            <div className="Login">

                <Form onSubmit={onSubmit}>
                    <h4>Create Quote</h4>

                    <Form.Group size="lg" controlId="Username">
                        <Form.Label>Cost</Form.Label>
                        <Form.Control
                        type="text"
                        onChange={(event) => setCost(event.target.value)} // calling event handler   
                        defaultValue={cost}  // global variable 
                        />
                    </Form.Group>

                    <Form.Group size="lg" controlId="Password">
                        <Form.Label>Description</Form.Label>
                        <Form.Control
                        type="text"
                        onChange={(event) => setDescription(event.target.value)} // calling event handler   
                        defaultValue={description}  // global variable 
                        />
                    </Form.Group>

                    <Button block size="lg" type="submit">
                    Send
                    </Button>

                </Form>
            </div>
      </div>

    ); 
}