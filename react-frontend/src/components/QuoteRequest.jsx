import React from "react";


const QuoteRequest = (props) => {
    
  // callback function that will set the appropriate quote request data for the quote request 
  function handleClick() {
    props.sendQuoteRequest(props);
  }

   return (
     <tr>
         <td><span onClick={handleClick}><code>{props.id}</code></span></td>
         <td>{props.itemId}</td>
         <td>{props.username}</td>
    </tr>
  );
};
export default QuoteRequest;