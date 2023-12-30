import { Link } from "react-router-dom";
import { useAppSelector } from "../../../store/hooks";

const ProductList = ({ data, currentPage }: any) => {
  const appSettings = useAppSelector((state) => state.appSettings);

  console.log(data.data);
  return (
    <div className={`grid md:grid-cols-2 grid-rows gap-2 m-2 `}>
      {data ? (
        data?.data
          ?.slice(currentPage - 1, currentPage + 9)
          ?.map((item: any, index: number) => {
            return (
              <Link
                to={item?.id.toString()}
                key={`${item?.id}_${index}`}
                className={`text-slate-200 rounded p-2 ${
                  appSettings.appTheme === "dark"
                    ? "text-slate-200 bg-gray-800"
                    : "text-slate-800 bg-gray-200"
                }`}
              >
                <div className="xl:flex md:flex flex-col">
                  <div>
                    <img
                      src={item?.thumbnail}
                      alt="product"
                      className="max-w-[220px]"
                    />
                    <div className="flex gap-1 pt-1">
                      {item?.images?.map((image: string) => (
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
                    <h1 key={`${item?.id}_${index}`} className="text-2xl">
                      {item?.title}
                    </h1>
                    <div className="flex">
                      <p className="price">{"$" + item?.price}</p>
                    </div>
                    <div className="flex">
                      <p className="">
                        {"$" +
                          (
                            item?.price -
                            item?.price * (item?.discountPercentage / 100)
                          ).toFixed(2)}
                      </p>
                      <span>{" " + " - " + " "}</span>
                      <p className="">{item?.discountPercentage + "%"}</p>
                    </div>
                    <p className="">{item?.description}</p>
                  </div>
                </div>
              </Link>
            );
          })
      ) : (
        <p>No products to display!</p>
      )}
    </div>
  );
};

export default ProductList;
