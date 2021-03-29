import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";

export default function Login(props) {
  const [user, setUser] = useState({});
  const [errors, setErrors] = useState({});

  const onSubmit = async (event) => {
    event.preventDefault();

    var response = await fetch("user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    switch (response.status) {
      case 200:
        props.history.push("login");
      case 400:
        var errors = (await response.json()).errors;
        console.log(errors);
        setErrors(errors);
    }
  };

  const onChange = (event) =>
    setUser((user) => ({ ...user, [event.target.name]: event.target.value }));

  return (
    <div className="Login">
      <Form onSubmit={onSubmit}>
        <Form.Group size="lg" controlId="FirstName">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            autoFocus
            type="text"
            name="firstName"
            onChange={onChange}
            defaultValue={user.firstName}
          />
          {errors?.FirstName ? (
            <Form.Label className="Error">{errors.FirstName[0]}</Form.Label>
          ) : (
            []
          )}
        </Form.Group>
        <Form.Group size="lg" controlId="LastName">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="lastName"
            onChange={onChange}
            defaultValue={user.lastName}
          />
          {errors?.LastName ? (
            <Form.Label className="Error">{errors.LastName[0]}</Form.Label>
          ) : (
            []
          )}
        </Form.Group>
        <Form.Group size="lg" controlId="Email">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            name="Email"
            onChange={onChange}
            defaultValue={user.email}
          />
          {errors?.Email ? (
            <Form.Label className="Error">{errors.Email[0]}</Form.Label>
          ) : (
            []
          )}
        </Form.Group>
        <Form.Group size="lg" controlId="Username">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            name="username"
            onChange={onChange}
            defaultValue={user.username}
          />
          {errors?.Username ? (
            <Form.Label className="Error">{errors.Username[0]}</Form.Label>
          ) : (
            []
          )}
        </Form.Group>
        <Form.Group size="lg" controlId="Password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            onChange={onChange}
            defaultValue={user.password}
          />
          {errors?.Password ? (
            <Form.Label className="Error">{errors.Password[0]}</Form.Label>
          ) : (
            []
          )}
        </Form.Group>
        <Button block size="lg" type="submit">
          SignUp
        </Button>
      </Form>
    </div>
  );
}
