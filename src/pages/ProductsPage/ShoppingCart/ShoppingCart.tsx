import { useAppSelector } from "../../../store/hooks";
import { ProductCard } from "../../../components";
import { IProducts } from "../../../interfaces/IProducts";
import { ChangeEvent, useEffect, useState } from "react";

const ShoppingCart = () => {
  console.log("Component ShoppingCart");
  const appSettings = useAppSelector((state) => state.appSettings);
  const productsCart = useAppSelector(
    (state) => state.cartProducts.cartProducts
  );

  const [productsToBuy, setProductsToBuy] = useState<any[]>([]);
  const [summating, setSummating] = useState({
    subTotal: 0,
    saved: 0,
    total: 0,
    selected: 0,
  });

  const settingSummating = () => {
    let subTotal = 0;
    let saved = 0;
    let total = 0;
    let selected = 0;

    productsToBuy.map((product) => {
      if (product.checked) {
        ++selected;
        subTotal += product.price;
        total +=
          product?.price - product?.price * (product?.discountPercentage / 100);
        saved +=
          product.price -
          (product?.price -
            product?.price * (product?.discountPercentage / 100));
      }
    });

    setSummating((prevObj) => ({
      ...prevObj,
      subTotal: +subTotal.toFixed(2),
      saved: +saved.toFixed(2),
      total: +total.toFixed(2),
      selected,
    }));
  };

  const settingCheckboxes = (param?: any) => {
    let products: IProducts[];
    if (param && param.id) {
      products = productsToBuy.map((product) => {
        if (param.id === product.id) {
          return { ...product, checked: !product.checked };
        }
        return product;
      });
    } else if (param && param.target) {
      products = productsToBuy.map((product) => {
        return { ...product, checked: param.target.checked };
      });
    } else {
      products = productsCart.map((product) => {
        return { ...product, checked: true };
      });
    }
    setProductsToBuy((prevObj) => (prevObj = products));
  };

  useEffect(() => {
    settingSummating();
  }, [productsToBuy]);

  useEffect(() => {
    settingCheckboxes();
  }, []);

  const onCheckboxProduct = (prod: IProducts) => {
    settingCheckboxes(prod);
  };

  const onCheckboxAll = (e: ChangeEvent<HTMLInputElement>) => {
    settingCheckboxes(e);
  };

  const onDeleteSelected = () => {
    console.log("onDeleteSelected");
  };

  const onBuy = () => {
    console.log("onBuy");
  };

  return (
    <div
      className={`md:container-fluid rounded flex gap-2 m-2 p-2 ${
        appSettings.appTheme === "dark"
          ? "text-slate-200 bg-gray-800"
          : "text-slate-800 bg-gray-200"
      }`}
    >
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl">Shopping Cart ({productsCart.length || 0})</h1>
        <div className="flex gap-2 my-1 ml-2">
          <div>
            <input
              id="checkbox_all"
              type="checkbox"
              defaultChecked={true}
              name="checkbox_name_all"
              onChange={onCheckboxAll}
              className="w-6 h-6 text-red-600 bg-gray-100  rounded  dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
            />
            <label
              htmlFor="checkbox_all"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              Select all items
            </label>
          </div>
          <span></span>
          <span
            className="font-bold text-blue-700 cursor-pointer"
            onClick={onDeleteSelected}
          >
            Delete selected items
          </span>
        </div>
        <div className="flex flex-col gap-2 mt-2">
          {productsToBuy?.map((product) => {
            return (
              <div className="flex gap-1 border border-slate-600 p-2 rounded min-w-2xl">
                <div className="flex items-start rounded mt-2">
                  <input
                    id={`checkbox_${product?.id}`}
                    type="checkbox"
                    checked={product?.checked}
                    name={`checkbox_name_${product?.id}`}
                    onChange={() => onCheckboxProduct(product)}
                    className="w-6 h-6 text-red-600 bg-gray-100  rounded  dark:focus:ring-red-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600 cursor-pointer"
                  />
                </div>

                <ProductCard
                  key={product?.id + "_cart"}
                  product={product}
                  styleList="flex"
                />
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex flex-col gap-2 p-2 border border-slate-600 w-80">
        <h1 className="text-2xl">Summary</h1>
        <div className="flex flex-col  mt-4">
          <div className="flex text-xl justify-between">
            <span>Subtotal</span>
            <span>{summating.subTotal} $</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Saved</span>
            <span>{summating.saved} $</span>
          </div>
          <div className="flex justify-between mt-1">
            <span>Total</span>
            <span>{summating.total} $</span>
          </div>
          <div className="flex justify-end my-2">
            <span>{summating.total} $</span>
          </div>
          <button
            className="w-full bg-red-500 hover:bg-red-600 rounded"
            onClick={onBuy}
          >
            Buy {summating.selected}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
