import React, {useState} from 'react';

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
            if(response.status == 200) { props.history.push("catalogue");  response.json().then((data => localStorage.setItem('token', data.token)))}
            else(alert("Incorrect Login Details!"))
        }).catch(err => console.log(err))
    }

    return (

        <div className='Component'>
            <h4> Login </h4>
            <form className='FormFields' onSubmit={onSubmit}> 

                <div className='FormField'>
                    <input type='text'
                    placeholder='Username'
                    name="username"
                    onChange={(event) => setUser({...user, username: event.target.value})} // calling event handler   
                    defaultValue={user.username}  // global variable 
                    className='Input'
                    />
                </div>

                <div className='FormField'>
                    <input type='password'
                    placeholder ='Password'
                    name="password"
                    onChange={(event) => setUser({...user, password: event.target.value})} // calling event handler
                    defaultValue={user.password} // global variable
                    className='Input'
                    />
                </div>

                <input type='submit' className='Button' value='Submit'></input>
            </form>  

        </div> 
    )

}