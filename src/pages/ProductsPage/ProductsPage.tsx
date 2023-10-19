import { useContext, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { IStateContext, StateContext } from "../../store/store";
import { Loader, Pagination, StatusMessage } from "../../components";

import ProductList from "./ProductList/ProductList";
import ProductSidebar from "./ProductSidebar/ProductSidebar";
import {
  GetProductCategoriesService,
  GetProductsByCategoryService,
  GetProductsService,
} from "../../services/ProductsServices";
import "./ProductsPage.scss";

const ProductsPage = () => {
  console.log("Component Products");
  const { state } = useContext<IStateContext>(StateContext);
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isSuccess, isError, error, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: GetProductsService,
    staleTime: 1000,
    // select(data) {
    //   return data.data;
    // },
  });

  //   const getByCategory = useQuery({
  //     ["products-category"],
  //   queryFn: GetProductsByCategoryService,
  //   staleTime: 1000,

  // });

  let tempArrCategories: string[] = [];
  if (isSuccess) {
    data?.products.map((item: any) => {
      const alreadyInArr = tempArrCategories?.includes(item.category);
      if (!alreadyInArr) {
        tempArrCategories.push(item.category);
      }
    });
  }
  if (isLoading) {
    return <Loader />;
  }
  if (isError && error instanceof Error) {
    return (
      <StatusMessage
        from="products-page"
        status="error"
        message={error?.message || ""}
      />
    );
  }

  const onSearchProducts = (value: React.ChangeEvent<HTMLInputElement>) => {
    console.log(value);
  };

  const onCategory = (value: string) => {
    //GetProductsByCategoryService
    console.log(value);
  };

  return (
    <div
      className="container-fluid products d-flex"
      style={{
        background: state?.appTheme === "dark" ? "#18191a" : "whitesmoke",
        color: state?.appTheme === "dark" ? "whitesmoke" : "#242526",
      }}
    >
      <ProductSidebar
        categories={tempArrCategories}
        onSearch={onSearchProducts}
        onCategory={onCategory}
      />
      <div className="row justify-content-md-center gap-4">
        <ProductList data={data} currentPage={currentPage} />
        <Pagination
          currentPage={currentPage}
          total={data?.products?.length}
          limit={9}
          onPageChange={(page: any) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
