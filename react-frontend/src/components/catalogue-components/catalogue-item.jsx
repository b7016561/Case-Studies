import React, {useState, useEffect} from 'react';

export default function CatalogueItem(props) {

    // login obj
    const [item, setItem] = useState({});
    const [requested, setRequested] = useState("");
 
    useEffect(() => {
        /*const item = {
            id: props.Id,
            name: props.itemName,
            description: props.itemDescription,
            imageURL: props.itemImageUrl,
            cost: props.itemCost
        }*/
        // setting current item
        const item = props;
        setItem(item)
    },[])
    
    function RequestQuote() {

        fetch("QuoteRequest", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: item.id
        })
        .then((response) => {
            if(response.status === 200) { setRequested("Quote Requested!") }
            else { setRequested("Quote Not Requested!") } 
        })
        .catch(err => console.log(err))  
    }

    return (

        <div className='Component'>

            <h4>{item.name}</h4>

            <button
            onClick={RequestQuote}
            >Request Quote
            </button>
            <small>{requested}</small>

            <p>{item.description}</p>
            <p>{item.cost}</p>

        </div> 
    )
}