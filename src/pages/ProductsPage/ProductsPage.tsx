import { useContext, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IStateContext, StateContext } from "../../store/store";
import { Loader, Pagination, StatusMessage } from "../../components";

import ProductList from "./ProductList/ProductList";
import ProductSidebar from "./ProductSidebar/ProductSidebar";
import NewProductModal from "./NewProductModal/NewProductModal";
import {
  GetProductsBySearchService,
  GetProductCategoriesService,
  GetProductsByCategoryService,
  GetProductsService,
} from "../../services/ProductsServices";
import "./ProductsPage.scss";

const ProductsPage = () => {
  console.log("Component Products");
  const { state } = useContext<IStateContext>(StateContext);
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);

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
    onSuccess: (result, variables) => {
      queryClient.cancelQueries(["products"]);
      queryClient.setQueryData(["products"], result);
    },
  });

  const productsBySearch = useMutation({
    mutationFn: GetProductsBySearchService,
    onSuccess: (result, variables) => {
      queryClient.cancelQueries(["products"]);
      queryClient.setQueryData(["products"], result);
    },
  });

  if (products?.isLoading || productsByCategory?.isLoading) {
    return <Loader />;
  }

  if (
    (products?.isError || productsByCategory?.isError) &&
    products?.error instanceof Error
  ) {
    return (
      <StatusMessage
        from="products-page"
        status="error"
        message={products?.error?.message || ""}
      />
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
    <div
      className="container-fluid products d-flex"
      style={{
        background: state?.appTheme === "dark" ? "#18191a" : "whitesmoke",
        color: state?.appTheme === "dark" ? "whitesmoke" : "#242526",
      }}
    >
      <ProductSidebar
        categories={categories?.data}
        onSearch={onSearchProducts}
        onCategory={onCategory}
      />
      <div className="row justify-content-md-center gap-4">
        <ProductList data={products?.data} currentPage={currentPage} />
        <Pagination
          currentPage={currentPage}
          total={products?.data?.products?.length}
          limit={9}
          onPageChange={(page: any) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
};

export default ProductsPage;
