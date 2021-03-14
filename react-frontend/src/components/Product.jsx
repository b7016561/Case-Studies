import React, {useEffect, useState} from 'react'
import Card from 'react-bootstrap/Card';


export default function Product(props) {

    const [product, setProduct] = useState({})

    useEffect(() => {

        setProduct(props.productValue);

    },[props.id])


    function sendProduct() {

        props.sendProduct(product);

    }
        return (
            <Card style={{ width: "100%", margin: "15px"}} border="secondary">
                <Card.Header>{product.name}</Card.Header>
                <Card.Body onClick={sendProduct}>{product.description}</Card.Body>
            </Card>

    )
}
