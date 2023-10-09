import React from "react";
import { useParams } from "react-router";

const Product = () => {
  const { id } = useParams();
  console.log(id);
  return <div>{id}</div>;
};

export default Product;
