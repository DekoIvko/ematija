import { useRef } from "react";
import { GrPrevious, GrNext } from "react-icons/gr";
import { useFetchQuery } from "../../hooks/useFetchQuery";
import { GetProductsFiltersService } from "../../services/ProductsServices";
import ProductCard from "../ProductCard/ProductCard";
import { IProducts } from "../../interfaces/IProducts";

interface IProps {
  category: string;
}

const ProductsSlide = ({ category }: IProps) => {
  console.log("Component ProductsSlide");
  const slideProductRef = useRef<HTMLDivElement>(null);

  const products = useFetchQuery(
    () => GetProductsFiltersService({ category, search: "" }),
    `products-slide-${category}`
  );

  const nextProduct = () => {
    slideProductRef!.current!.scrollLeft += 200;
  };

  const prevProduct = () => {
    slideProductRef!.current!.scrollLeft -= 200;
  };

  return (
    <div className="">
      <div className="flex w-full items-center">
        <h2 className="font-bold text-2xl text-slate-800 mb-4">
          More {category}
        </h2>
        <div className="ml-auto flex gap-4">
          <button
            onClick={prevProduct}
            className="bg-slate-300 hover:bg-slate-400 text-lg  p-1 rounded"
          >
            <GrPrevious />
          </button>
          <button
            onClick={nextProduct}
            className="bg-slate-300 hover:bg-slate-400 text-lg p-1 rounded "
          >
            <GrNext />
          </button>
        </div>
      </div>
      <div
        className="flex gap-1 overflow-scroll scrollbar-none scroll-smooth transition-all"
        ref={slideProductRef}
      >
        {products ? (
          products?.data?.data.map((item: IProducts) => {
            return <ProductCard key={item.id + "_slide"} product={item} />;
          })
        ) : (
          <>No products to display</>
        )}
      </div>
    </div>
  );
};

export default ProductsSlide;
