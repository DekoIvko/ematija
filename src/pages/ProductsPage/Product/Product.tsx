import { useContext } from "react";
import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { GetProductService } from "../../../services/ProductsServices";
import { IStateContext, StateContext } from "../../../store/store";

import "./Product.scss";

const Product = () => {
  const { id } = useParams();
  const { state } = useContext<IStateContext>(StateContext);
  const product = useQuery({
    queryKey: ["product", id],
    queryFn: () => GetProductService(id?.toString()!),
  });

  const onByNow = () => {
    console.log("boy now");
  };

  return (
    <div
      className="product"
      style={{
        background: state?.appTheme === "dark" ? "#18191a" : "whitesmoke",
        color: state?.appTheme === "dark" ? "whitesmoke" : "#242526",
      }}
    >
      <div className="product-body d-flex flex-row p-4">
        <div className="images">
          <img src={product?.data?.thumbnail} alt="" />
          <div className="images-small d-flex flex-row">
            {product?.data?.images.map((img: string, index: number) => {
              return <img key={img + index} src={img} alt="" />;
            })}
          </div>
        </div>
        <div className="products-head p-4">
          <h2>{product?.data?.title}</h2>
          <h5>{product?.data?.brand}</h5>
          <br />
          <div className="description">
            <p>{product?.data?.description}</p>
          </div>
          <hr className="hr hr-blurry" />
          <div>
            Category: <span>{product?.data?.category}</span>
          </div>
          <div className="d-flex flex-row gap-2">
            <div>
              Rating:<span> {product?.data?.rating}</span>
            </div>
            <div>
              Stock:<span> {product?.data?.stock}</span>
            </div>
          </div>
          <br />
          <div className="price d-flex flex-column gap-2">
            <div className="d-flex flex-row gap-2 align-items-center">
              <span style={{ textDecoration: "line-through" }}>
                {" " + product?.data?.price + "$"}
              </span>
              Discount:{" "}
              <span>{" " + product?.data?.discountPercentage + "%"}</span>
              Price:
              <span style={{ fontSize: "20px" }}>{` ${(
                product?.data?.price -
                product?.data?.price * (product?.data?.discountPercentage / 100)
              ).toFixed(2)}  $`}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="product-actions d-flex flex-row p-4 gap-4 justify-content-center align-items-center">
        <div className="d-flex ">
          <div>
            Delivery <span>Estimated delivery on 20-30 days </span>
          </div>
        </div>
        <div className="d-flex flex-row align-items-center">
          Quantity:{" "}
          <div>
            <input type="number" />
          </div>
        </div>
        <button type="button" className="btn btn-primary" onClick={onByNow}>
          By now
        </button>
      </div>
    </div>
  );
};

export default Product;
