import React from 'react';
import { Card, Row, Col, Button } from 'react-bootstrap';

export default function Dashboard() {
    return (
        <div className='Dashboard Component'>
            <h3>Dashboard</h3>
            <p>Choose from the options below</p>
            <div className="cards">
            <Row>
                <Col>
                    <Card>
                        <Card.Title>View my Quotes</Card.Title>
                    </Card>
                </Col>
                <Col>
                    <a href="/catalogue">
                        <Card>
                            <Card.Title>View Catalog</Card.Title>
                        </Card>
                    </a>
                </Col>
                <Col md-5>
                    <Card>
                        <Card.Title>Manage my account</Card.Title>
                    </Card>
                </Col>
            </Row>
            </div>
            <Row>
                <Button>Learn More</Button>
            </Row>
            
        </div>
    )
}
