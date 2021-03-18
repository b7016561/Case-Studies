import React, { useState } from 'react';
import {Form, Button} from 'react-bootstrap';
// import '../App.css';


export default function Login(props) {

    // login obj
    const [user, setUser] = useState({});

    function onSubmit(event) {

        event.preventDefault()
        fetch('user/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user)
        })
            .then((response) => {
                if (response.status == 200) {
                    response.json().then(data => {
                        localStorage.setItem('token', data.token)
                        switch(data.user.accountType) {
                            case 'E':
                                document.location.href = document.location.href = "quoteRequests"
                                break;
                            default: 
                                document.location.href = "catalogue"
                                break;
                        }
                    })
                    console.log(response)
                    //document.location.href = "/catalogue";
                }
                else (alert("Incorrect Login Details!"))
            }).catch(err => console.log(err))
    }

    return (
        <div className="Login">
        <Form onSubmit={onSubmit}>
          <Form.Group size="lg" controlId="Username">
            <Form.Label>Username</Form.Label>
            <Form.Control
              autoFocus
              type="text"
              onChange={(event) => setUser({ ...user, username: event.target.value })} // calling event handler   
              defaultValue={user.username}  // global variable 
            />
          </Form.Group>
          <Form.Group size="lg" controlId="Password">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              onChange={(event) => setUser({ ...user, password: event.target.value })} // calling event handler   
              defaultValue={user.password}  // global variable 
            />
          </Form.Group>
          <Button block size="lg" type="submit">
            Login
        </Button>
        </Form>
      </div>
    )

}