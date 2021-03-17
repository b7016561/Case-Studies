import Button from 'react-bootstrap/Button'
import { useState } from 'react'
// import "../App.css";

export default function Nav() {

    //  const [user] = useState

    return (
        <div class="Nav row m-3">
            <svg id="Logo">
                <circle cx={30} cy={30} r={30} fill="#f76540" />
            </svg>
            <div class="col text-right my-auto">
                <Button variant="primary" className="mr-2">Login</Button>
                <Button variant="secondary" >Signup</Button>
            </div>
        </div>
    )
}
