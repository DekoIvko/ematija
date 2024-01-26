import { ProductCard } from "../../../components";
import { IProducts } from "../../../interfaces/IProducts";

const ProductList = ({ data, currentPage }: any) => {
  return (
    <div className={`grid md:grid-cols-2 grid-rows gap-2 m-2 w-full`}>
      {data && data.data.length > 0 ? (
        data?.data
          ?.slice(currentPage - 1, currentPage + 9)
          ?.map((item: IProducts) => {
            return <ProductCard key={item.id + "_list"} product={item} />;
          })
      ) : (
        <div className="">
          <p className="text-2xl text-gray-200">No products to display!</p>
        </div>
      )}
    </div>
  );
};

export default ProductList;
