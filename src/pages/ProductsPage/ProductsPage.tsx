import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Loader, Pagination } from "../../components";
import { useErrorBoundary } from "react-error-boundary";

import ProductList from "./ProductList/ProductList";
import ProductSidebar from "./ProductSidebar/ProductSidebar";
import useDebounceEffect from "../../hooks/useDebounceEffect";
import {
  GetProductsFiltersService,
  GetProductCategoriesService,
} from "../../services/ProductsServices";

const ProductsPage = () => {
  console.log("Component ProductsPage");
  const { showBoundary } = useErrorBoundary();
  const queryClient = useQueryClient();
  const [currentPage, setCurrentPage] = useState(1);
  const [params, setParams] = useState({
    search: "",
    category: "",
  });

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: GetProductCategoriesService,
  });

  const products = useMutation({
    mutationFn: GetProductsFiltersService,
    onSuccess: (result) => {
      queryClient.setQueryData(["products"], result);
    },
  });

  useDebounceEffect(() => {
    products.mutateAsync(params);
  }, [params.category, params.search]);

  if (products?.isError || categories?.isError) {
    showBoundary(products?.error || categories?.error);
  }

  const onSearchProducts = async (name: string, value: string) => {
    setParams((prevParams) => ({ ...prevParams, [name]: value }));
  };

  return (
    <div className="md:container-fluid products flex">
      <ProductSidebar
        categories={categories?.data}
        onSearch={onSearchProducts}
      />
      <div className="">
        {products.isLoading && <Loader />}
        {products?.isSuccess && products?.data && (
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
