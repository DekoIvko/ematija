import { useQuery } from "@tanstack/react-query";
import { GetProductsService } from "../../services/ProductsServices";
import { Loader, StatusMessage } from "../../components";

import "./ProductsPage.scss";

const ProductsPage = () => {
  console.log("Component Products");

  const { data, isSuccess, isError, error, isLoading, isFetching } = useQuery({
    queryKey: ["products"],
    queryFn: GetProductsService,
    select(data) {
      return data.data;
    },
  });

  if (isSuccess) {
    console.log(data);
  }
  if (isLoading) {
    return <Loader />;
  }
  if (isError && error instanceof Error) {
    console.log(error);
    return <StatusMessage status="error" message={error?.message || ""} />;
  }

  return (
    <div className="container-fluid products d-flex">
      <div className="row">
        {data.products
          ? data?.products.map((item: any, index: number) => {
              return (
                <div key={`${item.id}_${index}`} className="col-sm">
                  {item?.title}
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
};

export default ProductsPage;
