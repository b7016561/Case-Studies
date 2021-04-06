import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {Form, Button} from 'react-bootstrap';


export default function QuoteRequestManager(props) {

    const [request, setRequest] = useState({});
    const [description, setDescription] = useState();
    const [cost, setCost] = useState("");
    const [item, setItem] = useState({});


    useEffect(() => {

        const currentRequest = props;
        setRequest(currentRequest);

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


    function onSubmit(event) {
        event.preventDefault(); // stopping form refreshing page.

        const quote = {
            id: request.id,
            itemId: request.itemId,
            username: request.username,
            totalCost: parseInt(cost),
            description: description
        }
        fetch('quote', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify(quote)
        }).then((res) =>  { 

            if(res.status === 200) { alert("Quote Created")}
            else { alert("Quote Not Created!")         
        }}).catch(err =>  console.log(err))
    }

    return (    
   
        <div className="Wrapper"> 
            <div className="ItemBox">
                <small style={{fontWeight: 'bold'}}>Item Name</small>
                <p className="">{item.name}</p>
                <small style={{fontWeight: 'bold'}}>Description</small>
                <p className="">{item.description}</p>
                <small style={{fontWeight: 'bold'}}>Supplier</small>
                <p className="">{item.supplierName}</p>
            </div>

            <div className="QuoteBox">
                <div style={{"textAlign": "left"}}>
                    <p><small style={{"fontWeight": "bold"}}>Address Line 1: </small>{request.addressLine1}</p>
                    <p><small style={{"fontWeight": "bold"}}>Address Line 2: </small>{request.addressLine2}</p>
                    <p><small style={{"fontWeight": "bold"}}>Address Line 3: </small>{request.addressLine3}</p>
                    <p><small style={{"fontWeight": "bold"}}>City: </small>{request.city}</p>
                    <p><small style={{"fontWeight": "bold"}}>Region: </small>{request.region}</p>
                    <p><small style={{"fontWeight": "bold"}}>Postcode: </small>{request.postCode}</p>

                </div>
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