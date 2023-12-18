import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader, Pagination } from "../../components";

import ProductList from "./ProductList/ProductList";
import ProductSidebar from "./ProductSidebar/ProductSidebar";
import {
  GetProductsBySearchService,
  GetProductCategoriesService,
  GetProductsByCategoryService,
  GetProductsService,
} from "../../services/ProductsServices";
import "./ProductsPage.scss";
import { useErrorBoundary } from "react-error-boundary";

const ProductsPage = () => {
  console.log("Component Products");
  const { showBoundary } = useErrorBoundary();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [counter, setCounter] = useState(1);

  const products = useQuery({
    queryKey: ["products"],
    queryFn: GetProductsService,
  });

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: GetProductCategoriesService,
  });

  const productsByCategory = useMutation({
    mutationFn: GetProductsByCategoryService,
    onSuccess: (result) => {
      queryClient.cancelQueries(["products"]);
      queryClient.setQueryData(["products"], result);
    },
  });

  const productsBySearch = useMutation({
    mutationFn: GetProductsBySearchService,
    onSuccess: (result) => {
      queryClient.cancelQueries(["products"]);
      queryClient.setQueryData(["products"], result);
    },
  });

  if (products?.isLoading || productsByCategory?.isLoading) {
    return <Loader />;
  }

  if (
    products?.isError ||
    productsByCategory?.isError ||
    productsBySearch?.isError ||
    categories?.isError
  ) {
    showBoundary(
      products?.error ||
        productsByCategory?.error ||
        productsBySearch?.error ||
        categories?.error
    );
  }

  const onSearchProducts = (value: string) => {
    if (value !== "") {
      productsBySearch.mutateAsync(value);
    } else {
      queryClient.refetchQueries(["products"]);
    }
  };

  const onCategory = (
    e: React.MouseEvent<HTMLButtonElement>,
    value: string
  ) => {
    e.preventDefault();
    if (value !== "all") {
      productsByCategory.mutateAsync(value);
    } else {
      queryClient.refetchQueries(["products"]);
    }
  };

  return (
    <div className="container-fluid products flex">
      <ProductSidebar
        categories={categories?.data}
        onSearch={onSearchProducts}
        onCategory={onCategory}
      />
      {counter}
      <button
        className="bg-red-500 text-slate-200 p-4"
        onClick={() => setCounter((prevCount) => prevCount + 1)}
      >
        Counter plus
      </button>
      <div className="row justify-content-md-center gap-4">
        {products?.data && (
          <>
            <ProductList data={products?.data} currentPage={currentPage} />

            <Pagination
              currentPage={currentPage}
              total={products?.data?.data?.length}
              limit={9}
              onPageChange={(page: any) => setCurrentPage(page)}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
