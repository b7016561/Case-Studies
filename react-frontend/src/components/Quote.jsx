import React from "react";


const Quote = (props) => {
    
  // callback function that will set the appropriate quote request data for the quote request 
  function handleClick() {
    props.sendQuote(props);
  }

  function StatusCell() {
     switch(props.status) {
        case 'PENDING':
          return (
            <td style={{backgroundColor: '#D0312D'}}>{props.status}</td>
          )
          
        case 'PROCESSED':
            return (
              <td style={{backgroundColor: '#4CBB17'}}>{props.status}</td>
            )
     }
  }

   return (
     <tr>
         <td>{props.id}</td>
         <td><span onClick={handleClick}><code>{props.itemId}</code></span></td>
         <td>{props.username}</td>
         <td>{props.totalCost}</td>
         <td>{props.description}</td>
         <StatusCell />
    </tr>
  );
};
export default Quote;