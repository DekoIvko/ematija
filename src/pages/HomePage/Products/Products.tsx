import { useCallback, useEffect, useState } from "react";
import { GetProductsService } from "../../../services/ProductsServices";
import { Loader, StatusMessage } from "../../../components";

import "./Products.scss";

const Products = () => {
  console.log("Component Products");
  const [products, setProducts] = useState<[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error>();

  const getAllProducts = useCallback(async () => {
    setLoading(true);
    try {
      const { data, status } = await GetProductsService();

      if (status === 200) {
        setProducts(data?.products);
      } else {
        setError(data.message);
      }
    } catch (error: any) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [products]);

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <div className="container-fluid products d-flex">
      {loading && !error && <Loader />}
      {!loading && error && (
        <StatusMessage status="error" message={error?.message} />
      )}
      <div className="row">
        {products
          ? products.map((item: any, index: number) => {
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

export default Products;
