import React from "react";
import { Link } from "react-router-dom";
import { IProducts } from "../../interfaces/IProducts";
import { useAppSelector } from "../../store/hooks";

interface IProps {
  product: IProducts;
  styleList?: string;
}

const ProductCard = ({ product, styleList }: IProps) => {
  console.log("Component ProductCard");
  const appSettings = useAppSelector((state) => state.appSettings);

  return (
    <Link
      to={product?.id.toString()}
      key={product?.id}
      className={`text-slate-200 rounded p-2 ${
        appSettings.appTheme === "dark"
          ? "text-slate-200 bg-gray-800"
          : "text-slate-800 bg-gray-200"
      }`}
    >
      <div
        className={`xl:flex md:flex  ${styleList ? styleList : " flex-col"}`}
      >
        <div>
          <img
            src={product?.thumbnail}
            alt="product"
            className="max-w-[220px]"
          />
          <div className="flex gap-1 pt-1">
            {product?.images?.map((image: string) => (
              <img
                key={image}
                src={image ? image : ""}
                alt="product"
                className="max-w-[50px]"
              />
            ))}
          </div>
        </div>
        <div className="p-4 flex flex-col gap-4">
          <h1 className="text-2xl">{product?.title}</h1>
          <div className="flex">
            <p className="price">{"$" + product?.price}</p>
          </div>
          <div className="flex">
            <p className="">
              {"$" +
                (
                  product?.price -
                  product?.price * (product?.discountPercentage! / 100)
                ).toFixed(2)}
            </p>
            <span>{" - "}</span>
            <p className="">{product?.discountPercentage + "%"}</p>
          </div>
          <p className="">{product?.description}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
