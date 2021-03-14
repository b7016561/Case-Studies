import React, { Component } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import CatalogueItem from '../components/catalogue-components/catalogue-item'

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
            this.setState({ 'items': res.data });
        })
    }

    async setProduct(props) {
       await this.setState({'product': props})
      
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

                <CatalogueItem {...this.state.product}/>

            </div>
        )
    }
}

export default Catalog;