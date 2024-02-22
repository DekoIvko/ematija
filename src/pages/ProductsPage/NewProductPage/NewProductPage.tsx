// import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { BiSolidCloudUpload } from "react-icons/bi";
// import { IProducts } from "../../../interfaces/IProducts";
import {
  AddNewProductsService,
  GetProductCategoriesService,
} from "../../../services/ProductsServices";

import "./NewProductPage.scss";
import { imageToBase64 } from "../../../utils/helpers";
import { Controller, useForm } from "react-hook-form";
import { INewProductFormFields } from "../../../interfaces/INewProductFormFields";


const productsParams: INewProductFormFields = {
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
  address: {
    city: 'Skopje',
    address: 'Partizanska',
    phone: '070 388 833'
  }
};

// react-hook-form da go naprais i logiranjeto!!!!! mnogu vazno!!!!!
const NewProductModal = () => {
  // const queryClient = useQueryClient();
  const form =  useForm<INewProductFormFields>({
    defaultValues: productsParams // set default values
  });

  const { register, control, handleSubmit, formState } = form;

 const { errors } = formState;

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

  const onAddProducts = (data: INewProductFormFields) => {
    // if (validation()) {
    // addNewProducts.mutateAsync(data); // tuka tipovite nesto se bunat
    // }
  };

  const handleUploadImage = async (e: any) => {
    const imageBase = await imageToBase64(e.target.files[0]);
    // ova tuka treba da go naprais slikata sstais vo formata
    // setProductsParams((prevObj: IProducts) => ({
    //   ...prevObj,
    //   thumbnail: imageBase?.toString(),
    // }));
  };

  return (
    <div className="p-4 m-auto">
      <div className="flex justify-center py-4">
        <h2 className="text-2xl text-white">New product</h2>
      </div>{" "}
      <form onSubmit={handleSubmit(onAddProducts)}
        action=""
        className="w-full flex flex-col max-w-lg m-auto bg-white rounded p-4"
      >
        <Controller name="category" render={({field}) => (

        <select
          id="category"
          className="bg-slate-200 p-1 "
          {...register('category')}
          >
          {categories?.data?.map((category: any, index: number) => {
            return (
              <option key={`${category}_${index}_`} value={category}>
                {category}
              </option>
            );
          })}
        </select>
        )}>

          </Controller>

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
{/* nested object in react-hook-form teeessttt */}
<Controller name="address-city" render={({field}) => (

        // <label className="my-1" id="address-city" htmlFor="address-city">
        //   Title
        // </label>
        <input
          id="address-city"
          // name="address-city"
          className="bg-slate-200 p-1 my-1"
          value={field.value}
          {...register("address.city")} />
)}>


          </Controller>

        <label className="my-1" id="product-title" htmlFor="product-title">
          Title
        </label>
        <input
          id="product-title"
          className="bg-slate-200 p-1 my-1"
          {...register("title", { required: {value: true, message: 'Title is required!'} })} />
          <p>{errors.title?.message}</p> 
          {/* treba tuka naprais crveno da prikazuva kako error message */}

        <label className="my-1" htmlFor="product-brand">
          Brand
        </label>
        <input
          id="product-brand"
          className="bg-slate-200 p-1 my-1 "
          {...register('brand', {required: {value: true, message: 'Brand is required!'}})}
        />
        <p>{errors.brand?.message}</p>
        {/* treba tuka naprais crveno da prikazuva kako error message */}

        {/* {validateForm.price && (
          <span className="error-validate">Please fill the price</span>
        )} */}

        <label>Price</label>
        <input
          type="number"
          {...register('price')}
          className="bg-slate-200 p-1 my-1 "
        />
{/* 
        {validateForm.stock && (
          <span className="error-validate">Please fill the stock</span>
        )} */}

        <label className="my-1" htmlFor="product-stock">
          Stock/ how many
        </label>
        <input
          id="product-stock"
          type="number"
          className="bg-slate-200 p-1 my-1 "
          {...register('stock')}
        />

        {/* {validateForm.rating && (
          <span className="error-validate">Please fill the rating</span>
        )} */}

        <label className="my-1" htmlFor="product-rating">
          Rating
        </label>
        <input
          id="product-rating"
          type="number"
          className="bg-slate-200 p-1 my-1 "
          {...register('rating')}
        />

        {/* {validateForm.description && (
          <span className="error-validate">Please fill the description</span>
        )} */}

        <label className="my-1" htmlFor="product-description">
          Description
        </label>
        <input
          id="product-description"
          className="bg-slate-200 p-1 my-1 "
          {...register('description')}
          // name="description"
          // onChange={handleOnChange}
        />

        <button
          className="p-2 mt-4 bg-red-400 hover:bg-red-600 rounded text-white font-medium font-bold"
          // onClick={(e) => onAddProducts(e)}
          type="submit"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default NewProductModal;
