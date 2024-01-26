import { useParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import { GetProductService } from "../../../services/ProductsServices";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { ProductsSlide } from "../../../components";
import { addProductToCart } from "../../../store/cartProductsSlice";
import toast from "react-hot-toast";

const Product = () => {
  console.log("Component Product");
  const { id } = useParams();
  const appSettings = useAppSelector((state) => state.appSettings);
  const appDispatch = useAppDispatch();
  const product = useQuery({
    queryKey: ["product", id],
    queryFn: () => GetProductService(id?.toString()!),
  });

  const onByNow = () => {
    console.log("boy now");
  };

  const onAddToCart = async () => {
    console.log("add to cart now");
    await appDispatch(addProductToCart(product.data!.data));
    toast.success("Successfully add to cart");
  };

  return (
    <>
      <div
        className={`text-slate-200 rounded p-4 m-2 ${
          appSettings.appTheme === "dark"
            ? "text-slate-200 bg-gray-800"
            : "text-slate-800 bg-gray-200"
        }`}
      >
        <div className=" flex flex-row p-4">
          <div className="shadow">
            <img
              src={product?.data?.data.thumbnail}
              alt=""
              className="max-w-[1220px]"
            />
            <div className="flex flex-row gap-1 pt-1">
              {product?.data?.data.images.map((img: string) => {
                return (
                  <img key={img} src={img} alt="" className="max-w-[122px]" />
                );
              })}
            </div>
          </div>
          <div className="p-4 flex flex-col gap-4">
            <h2 className="text-5xl">{product?.data?.data.title}</h2>
            <h5 className="text-2xl">{product?.data?.data.brand}</h5>
            <br />
            <div className="text-xl">
              <p>{product?.data?.data.description}</p>
            </div>
            <hr className="hr hr-blurry" />
            <div>
              Category: <span>{product?.data?.data.category}</span>
            </div>
            <div className="flex flex-row gap-2">
              <div>
                Rating:<span> {product?.data?.data.rating}</span>
              </div>
              <div>
                Stock:<span> {product?.data?.data.stock}</span>
              </div>
            </div>
            <br />
            <div className=" flex flex-col gap-2">
              <div className="flex flex-row gap-2 items-center">
                <span style={{ textDecoration: "line-through" }}>
                  {" " + product?.data?.data.price + "$"}
                </span>
                Discount:{" "}
                <span>
                  {" " + product?.data?.data.discountPercentage + "%"}
                </span>
                Price:
                <span className="font-medium">{` ${(
                  product?.data?.data.price -
                  product?.data?.data.price *
                    (product?.data?.data.discountPercentage / 100)
                ).toFixed(2)}  $`}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-row p-4 gap-4 justify-center items-center">
          <div className="flex ">
            <div>
              Delivery <span>Estimated delivery on 20-30 days </span>
            </div>
          </div>
          {/* <div className="flex flex-row items-center">
          Quantity:{" "}
          <div>
            <input
              type="number"
              className="w-full rounded bg-slate-200 text-slate-800 p-1 mx-1"
            />
          </div>
        </div> */}
          <button
            type="button"
            className="px-4 py-1 m-1 bg-red-500 hover:bg-red-600 rounded font-bold"
            onClick={onByNow}
          >
            By now
          </button>
          <button
            type="button"
            className="px-4 py-1 m-1 bg-red-300 hover:bg-red-400 rounded font-bold"
            onClick={onAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mx-2">
        <ProductsSlide category={product.data?.data.category} />
      </div>
    </>
  );
};

export default Product;
