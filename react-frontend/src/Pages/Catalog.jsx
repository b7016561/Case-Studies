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
        axios.get('/CatalogItem',{
            headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }}).then((res) => {
            this.setState({ 'items': res.data });
        }).catch()
    }


    async setProduct(props) {
        await this.setState({ 'product': props })
        document.location.href = `catalogueItem?id=${this.state.product.id}`
        console.log(this.state.product);
    }



    render() {
        const tickets = this.state.items;
        const items = [];

        for (const [index, value] of tickets.entries()) {
            items.push(
                <Col md={3}>
                    <Product key={index} sendProduct={this.setProduct} productValue={value}></Product>
                </Col>
            );
        }

        return (
            <div>
            <div style={{textAlign: "center"}}>
                    
                    <h2>ABC Catalog</h2>
                    <p>Browse the catalog and select the item you wish to request a for</p>
                    
            </div>
            <div>
                <Row>
                {items}

                </Row>
            </div>
            </div>
        )
    }
}

export default Catalog;
