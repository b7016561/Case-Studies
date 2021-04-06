import React, { Component } from 'react'
import { Jumbotron, Container, Button ,Image, Row, Col } from 'react-bootstrap';
export default class Home extends Component {
    render() {
        return (
            <div className="Home">
                <Jumbotron fluid>
                    <Container>
                        <Row>
                            <Col id="jumboText">
                                <h1>ABC Energy Limited</h1>
                                <p>Here at ABC, we are commited in providing you with the best customer experience.</p> <p> Please login to our new online system to manage your account!</p>
                                <Button>Learn More</Button>
                            </Col>
                            <Col>
                                <Image src="https://www.worldloppet.com/wp-content/uploads/2018/10/no-img-placeholder.png"></Image>
                            </Col>
                        </Row>
                    </Container>
                </Jumbotron>
            </div>
        )
    }
}
