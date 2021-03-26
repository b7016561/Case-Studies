import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

export default function Product(props) {
  const [product, setProduct] = useState({});

  useEffect(() => {
    console.log(props.productValue);
    setProduct(props.productValue);
  }, [props.id]);

  function sendProduct() {
    props.sendProduct(product);
  }

  return (
    <Card
      style={{ width: "100%", margin: "15px" }}
      border="secondary"
      onClick={sendProduct}
    >
      <Card.Header>{product.name}</Card.Header>
      <Card.Body>{product.description}</Card.Body>
    </Card>
  );
}
