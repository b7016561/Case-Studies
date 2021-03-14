import React, { Component } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';

class Catalog extends Component {

    constructor() {
        super();
        this.state = {
            items: [],
            product: {}
        }

        this.sendProduct = this.sendProduct.bind(this);
    }

    componentDidMount() {
        axios.get('/CatalogItem').then((res) => {
            this.setState({ 'items': res.data });
            console.log(this.state.items);
        })
    }

    sendProduct(props) {

        this.setState({'product': props});


    }

    render() {
        const tickets = this.state.items;
        const items = [];

        for (const [index, value] of tickets.entries()) {
            items.push(
                <Col xs={3}>
                    <Product key={index} sendProduct={this.sendProduct} productValue={value}></Product>
                </Col>
            );
        }
        
        return (
            
            <div>
                <Row className="justify-content-center">
                    {items}
                </Row>


                <CatalogueItem {...this.state.product}/>
            </div>
        )
    }
}

export default Catalog;