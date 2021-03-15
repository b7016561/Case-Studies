import React, { Component } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CatalogueItem from './CatalogueItem'

class Catalog extends Component {

    constructor() {
        super();
        this.state = {
            items: [],
            product: []
        }

        this.setProduct = this.setProduct.bind(this);
    }

    componentDidMount() {
        axios.get('/CatalogItem').then((res) => {
            console.log(res.data)
            this.setState({ 'items': res.data });
        })
    }

    async setProduct(props) {
       await this.setState({'product': props})
       document.location.href=`/catalogueItem?id=${this.state.product.id}`;
        console.log(this.state.product);
    }

    render() {
        const tickets = this.state.items;
        const items = [];
      
        for (const [index, value] of tickets.entries()) {
            items.push(
                <Col xs={3}>
                    <Product key={index} sendProduct={this.setProduct} productValue={value}></Product>
                </Col>
            );
        }
        
        return (
            
            <div>
                <Row className="justify-content-center">
                    {items}
                </Row>

            </div>
        )
    }
}

export default Catalog;