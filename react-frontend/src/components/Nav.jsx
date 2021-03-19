import Button from 'react-bootstrap/Button'
import { useEffect, useState } from 'react'

export default function Nav(props) {


    const [currentUser, setCurrent] = useState({})

    useEffect(()=>
    {
        const user = props.user;
        setCurrent(user)
        console.log("Nav User: " + currentUser.username);


    },[props.user.username])


    // Front End Routes
    function Login() {
        props.history.push("login");
    }
    function QuoteRequests() {
        props.history.push("quoteRequests");
    }
    function Quotes() {
        props.history.push("quotes")
    }
    function Catalogue() {
        props.history.push("catalogue")
    }

    function EmpNav () {
        return (

            <div className="col text-right my-auto">
                <Button variant="secondary" >Signout</Button>

                <Button 
                variant="secondary"
                onClick={QuoteRequests}
                >Quote Requests</Button>
            </div>
        )
    }

    function UserNav() {
        return (
            <div className="col text-right my-auto">
                <Button variant="secondary" >Signout</Button>

                <Button 
                variant="secondary"
                onClick={Quotes}
                >Quotes
                </Button>

                <Button 
                variant="secondary"
                onClick={Catalogue}
                >Catalogue
                </Button>
            </div>
        )
    }

    function VisitNav() {
        return (
            <div className="col text-right my-auto">
                
                <Button 
                variant="primary" 
                className="mr-2"
                onClick={Login}
                >Login</Button>

                <Button variant="secondary" >Signup</Button>
            </div>
        )    
    }

    function DisplayNav() {

        switch(currentUser.accountType)
        {
            case 'E':
                return ( <EmpNav /> )
            
            case 'U':
                return ( <UserNav /> )
                
            default:
                return ( <VisitNav /> )
        }
    }

    return (
        
        <div className="Nav row m-3">
            <svg id="Logo">
                <circle cx={30} cy={30} r={30} fill="#f76540" />
            </svg>
                <DisplayNav />             
        </div>
    )
}
