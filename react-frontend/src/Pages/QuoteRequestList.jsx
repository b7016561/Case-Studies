import React, {useState, useEffect} from 'react';
import axios from 'axios';
import {Table} from 'react-bootstrap';
import QuoteManager from '../components/QuoteRequestManager'
import QuoteRequest from '../components/QuoteRequest';

export default function QuoteRequestList(props) {

    const [quoteRequests, setQuoteRequests] = useState([])
    const [quoteRequest, setQuoteRequest] = useState({})

    useEffect(() => {
        axios.get("quoteRequest", {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then((response) => {
            console.log(response);
            setQuoteRequests(response.data);
        })
        .catch(err => console.log(err))
    },[])

    // call back function that sets the quote request that has been selected
    function getQuoteRequest(data) {
        const request = {
            id: data.id, 
            itemId: data.itemId, 
            username: data.username,
        }
        setQuoteRequest(request)
    }

    return (
        <div className="Component">
            <h4>Quote Requests</h4>
        <div>                    
            <Table responsive striped bordered hover size="sm" variant="dark">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>ItemID</th>
                        <th>Request Sender</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        //mapping over filtered tickets and displaying ticket rows, and passing callback function as a prop
                        quoteRequests.map((quoteRequest, key) => {
                            return <QuoteRequest key={key} sendQuoteRequest={getQuoteRequest} {...quoteRequest}/>
                        })
                    }
                </tbody>
            </Table>    
        </div>
            <QuoteManager {...quoteRequest}/>
        </div>   
    )
}
