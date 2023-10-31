import { Link } from "react-router-dom";

const ProductList = ({ data, currentPage }: any) => {
  return (
    <>
      {data.products
        ? data?.products
            ?.slice(currentPage - 1, currentPage + 9)
            ?.map((item: any, index: number) => {
              return (
                <Link
                  to={item?.id.toString()}
                  key={`${item?.id}_${index}`}
                  className="product col-sm"
                >
                  <div className="card">
                    <img
                      src={item?.thumbnail}
                      alt="product image"
                      className="card-img-top img-img"
                    />
                    <div className="small-images d-flex gap-1">
                      {item?.images?.map((image: string) => (
                        <img
                          key={image}
                          src={image ? image : ""}
                          alt="product image"
                          className="card-img-top"
                        />
                      ))}
                    </div>
                    <h5
                      key={`${item?.id}_${index}`}
                      className="col-sm card-title"
                    >
                      {item?.title}
                    </h5>
                    <div className="d-flex">
                      <p className="price">{"$" + item?.price}</p>
                    </div>
                    <div className="d-flex">
                      <p className="">
                        {"$" +
                          (
                            item?.price -
                            item?.price * (item?.discountPercentage / 100)
                          ).toFixed(2)}
                      </p>
                      <span>{" " + " - " + " "}</span>
                      <p className="discount-price">
                        {item?.discountPercentage + "%"}
                      </p>
                    </div>
                    <p className="card-text">{item?.description}</p>
                  </div>
                </Link>
              );
            })
        : null}
    </>
  );
};

export default ProductList;
