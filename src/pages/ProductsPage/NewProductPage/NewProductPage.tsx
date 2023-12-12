import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BiSolidCloudUpload } from "react-icons/bi";
import { IProducts } from "../../../interfaces/IProducts";
import {
  AddNewProductsService,
  GetProductCategoriesService,
} from "../../../services/ProductsServices";

import "./NewProductPage.scss";
import { imageToBase64 } from "../../../utils/helpers";

interface ErrorValidate {
  title: boolean;
  category: boolean;
  brand: boolean;
  price: boolean;
  stock: boolean;
  description: boolean;
  rating: boolean;
}

const NewProductModal = () => {
  const queryClient = useQueryClient();
  const [productsParams, setProductsParams] = useState<IProducts>({
    id: 1,
    title: "",
    category: "smartphones",
    brand: "",
    description: "",
    price: 0,
    rating: 0,
    stock: 0,
    discountPercentage: 10,
    images: [],
    thumbnail: "",
  });

  const [validateForm, setValidateForm] = useState<ErrorValidate>({
    title: false,
    category: false,
    brand: false,
    price: false,
    stock: false,
    description: false,
    rating: false,
  });

  const categories = useQuery({
    queryKey: ["categories"],
    queryFn: GetProductCategoriesService,
  });

  const addNewProducts = useMutation({
    mutationFn: AddNewProductsService,
    onSuccess: (result, variables) => {
      console.log(result, variables);
      // queryClient.cancelQueries(["products"]);
      // queryClient.setQueryData(["products"], (oldData: any) => {
      //   return { ...oldData, products: [variables, ...oldData.products] };
      // });
    },
  });

  const validation = () => {
    let validate = true;
    if (!productsParams.title) {
      validate = false;
      setValidateForm((prevObj: ErrorValidate) => ({
        ...prevObj,
        title: true,
      }));
    } else {
      setValidateForm((prevObj: ErrorValidate) => ({
        ...prevObj,
        title: false,
      }));
    }

    if (!productsParams.category) {
      validate = false;
      setValidateForm((prevObj: ErrorValidate) => ({
        ...prevObj,
        category: true,
      }));
    } else {
      setValidateForm((prevObj: ErrorValidate) => ({
        ...prevObj,
        category: false,
      }));
    }

    if (!productsParams.brand) {
      validate = false;
      setValidateForm((prevObj: ErrorValidate) => ({
        ...prevObj,
        brand: true,
      }));
    } else {
      setValidateForm((prevObj: ErrorValidate) => ({
        ...prevObj,
        brand: false,
      }));
    }

    if (!productsParams.price || productsParams.price <= 0) {
      validate = false;
      setValidateForm((prevObj: ErrorValidate) => ({
        ...prevObj,
        price: true,
      }));
    } else {
      setValidateForm((prevObj: ErrorValidate) => ({
        ...prevObj,
        price: false,
      }));
    }

    if (!productsParams.stock || productsParams.stock <= 0) {
      validate = false;
      setValidateForm((prevObj: ErrorValidate) => ({
        ...prevObj,
        stock: true,
      }));
    } else {
      setValidateForm((prevObj: ErrorValidate) => ({
        ...prevObj,
        stock: false,
      }));
    }

    if (
      !productsParams.description ||
      productsParams.description.length === 0
    ) {
      validate = false;
      setValidateForm((prevObj: ErrorValidate) => ({
        ...prevObj,
        description: true,
      }));
    } else {
      setValidateForm((prevObj: ErrorValidate) => ({
        ...prevObj,
        description: false,
      }));
    }

    return validate;
  };

  const onAddProducts = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    // if (validation()) {
    addNewProducts.mutateAsync(productsParams);
    // }
  };

  const handleOnChange = (e: any) => {
    // add category
    const { name, value } = e.target;
    setProductsParams((prevObj: IProducts) => ({
      ...prevObj,
      [name]: value,
    }));
  };

  const handleUploadImage = async (e: any) => {
    const imageBase = await imageToBase64(e.target.files[0]);
    setProductsParams((prevObj: IProducts) => ({
      ...prevObj,
      thumbnail: imageBase?.toString(),
    }));
  };

  return (
    <div className="p-4 m-auto">
      <div className="flex justify-center py-4">
        <h2 className="text-2xl text-white">New product</h2>
      </div>{" "}
      <form
        action=""
        className="w-full flex flex-col max-w-lg m-auto bg-white rounded p-4"
      >
        {validateForm.category && (
          <span className="error-validate">Please fill the category</span>
        )}
        <select
          name="category"
          id="category"
          className="bg-slate-200 p-1  "
          onChange={handleOnChange}
          placeholder="Please choice category"
        >
          {categories?.data?.map((category: any, index: number) => {
            return (
              <option key={`${category}_${index}_`} value={category}>
                {category}
              </option>
            );
          })}
        </select>

        <label htmlFor="image" className="my-1">
          Image
          <div className="h-40 w-full bg-slate-300 my-3 rounded flex items-center justify-center cursor-pointer">
            {productsParams?.thumbnail ? (
              <img
                src={productsParams?.thumbnail}
                alt="product"
                className="h-full"
              />
            ) : (
              <span className="text-5xl">
                <BiSolidCloudUpload />
              </span>
            )}
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={handleUploadImage}
              className="hidden"
            />
          </div>
        </label>

        {validateForm.title && (
          <span className="error-validate">Please fill the title</span>
        )}

        <label className="my-1" id="product-title" htmlFor="product-title">
          Title
        </label>
        <input
          name="title"
          id="product-title"
          className="bg-slate-200 p-1 my-1"
          onChange={handleOnChange}
        />

        {validateForm.brand && (
          <span className="error-validate">Please fill the brand</span>
        )}

        <label className="my-1" htmlFor="product-brand">
          Brand
        </label>
        <input
          id="product-brand"
          name="brand"
          className="bg-slate-200 p-1 my-1 "
          onChange={handleOnChange}
        />

        {validateForm.price && (
          <span className="error-validate">Please fill the price</span>
        )}

        <label>Price</label>
        <input
          type="number"
          name="price"
          className="bg-slate-200 p-1 my-1 "
          onChange={handleOnChange}
        />

        {validateForm.stock && (
          <span className="error-validate">Please fill the stock</span>
        )}

        <label className="my-1" htmlFor="product-stock">
          Stock/ how many
        </label>
        <input
          id="product-stock"
          name="sock"
          type="number"
          className="bg-slate-200 p-1 my-1 "
          onChange={handleOnChange}
        />

        {validateForm.rating && (
          <span className="error-validate">Please fill the rating</span>
        )}

        <label className="my-1" htmlFor="product-rating">
          Rating
        </label>
        <input
          id="product-rating"
          name="rating"
          type="number"
          className="bg-slate-200 p-1 my-1 "
          onChange={handleOnChange}
        />

        {validateForm.description && (
          <span className="error-validate">Please fill the description</span>
        )}

        <label className="my-1" htmlFor="product-description">
          Description
        </label>
        <input
          id="product-description"
          className="bg-slate-200 p-1 my-1 "
          name="description"
          onChange={handleOnChange}
        />

        <button
          className="p-2 mt-4 bg-red-400 hover:bg-red-600 rounded text-white font-medium font-bold"
          onClick={(e) => onAddProducts(e)}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default NewProductModal;
