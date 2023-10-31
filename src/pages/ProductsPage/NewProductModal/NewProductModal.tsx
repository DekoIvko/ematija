import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Modal, Button, InputGroup, Form } from "react-bootstrap";
import { Dropdowns } from "../../../components";
import { IProducts } from "../../../interfaces/IProducts";
import { AddNewProductsService } from "../../../services/ProductsServices";

import "./NewProductModal.scss";

interface ErrorValidate {
  title: boolean;
  category: boolean;
  brand: boolean;
  price: boolean;
  stock: boolean;
  description: boolean;
}

interface IProps {
  categories: string[];
}

const NewProductModal = ({ categories }: IProps) => {
  const queryClient = useQueryClient();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [productsParams, setProductsParams] = useState<IProducts>({
    id: categories?.length + 1250,
    title: "",
    category: "",
    brand: "",
    description: "",
    price: 0,
    rating: 0,
    stock: 0,
    discountPercentage: 0,
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
  });

  const addNewProducts = useMutation({
    mutationFn: AddNewProductsService,
    onSuccess: (variables) => {
      queryClient.cancelQueries(["products"]);
      queryClient.setQueryData(["products"], (oldData: any) => {
        return { ...oldData, products: [variables, ...oldData.products] };
      });
      setShow(false);
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
    if (validation()) {
      addNewProducts.mutateAsync(productsParams);
    }
  };

  const onClickItem = (item: string) => {
    // add category
    setProductsParams((prevObj: IProducts) => ({
      ...prevObj,
      category: item,
    }));
  };

  return (
    <>
      <Button type="button" className="btn btn-secondary" onClick={handleShow}>
        Add your product
      </Button>

      <Modal
        size="lg"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
        className="modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            New products
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {validateForm.category && (
            <span className="error-validate">Please fill the title</span>
          )}
          <Dropdowns
            titleBtn="Choice category"
            onClickItem={onClickItem}
            menuItems={categories}
          />
          <br />
          {validateForm.title && (
            <span className="error-validate">Please fill the title</span>
          )}
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Title
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              onChange={(e) =>
                setProductsParams((prevObj: IProducts) => ({
                  ...prevObj,
                  title: e.target.value,
                }))
              }
            />
          </InputGroup>
          <br />
          {validateForm.brand && (
            <span className="error-validate">Please fill the brand</span>
          )}
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Brand
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              onChange={(e) =>
                setProductsParams((prevObj: IProducts) => ({
                  ...prevObj,
                  brand: e.target.value,
                }))
              }
            />
          </InputGroup>
          <br />
          {validateForm.price && (
            <span className="error-validate">Please fill the price</span>
          )}
          <InputGroup className="mb-3">
            <InputGroup.Text>$</InputGroup.Text>
            <InputGroup.Text>0.00</InputGroup.Text>
            <Form.Control
              type="number"
              aria-label="Dollar amount (with dot and two decimal places)"
              onChange={(e) =>
                setProductsParams((prevObj: IProducts) => ({
                  ...prevObj,
                  price: parseInt(e.target.value, 10),
                }))
              }
            />
          </InputGroup>
          <br />
          {validateForm.stock && (
            <span className="error-validate">Please fill the stock</span>
          )}
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Stock/ how many
            </InputGroup.Text>
            <Form.Control
              type="number"
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              onChange={(e) =>
                setProductsParams((prevObj: IProducts) => ({
                  ...prevObj,
                  stock: parseInt(e.target.value, 10),
                }))
              }
            />
          </InputGroup>
          <br />
          {validateForm.description && (
            <span className="error-validate">Please fill the description</span>
          )}
          <InputGroup className="mb-3">
            <InputGroup.Text id="inputGroup-sizing-default">
              Description
            </InputGroup.Text>
            <Form.Control
              aria-label="Default"
              aria-describedby="inputGroup-sizing-default"
              onChange={(e) =>
                setProductsParams((prevObj: IProducts) => ({
                  ...prevObj,
                  description: e.target.value,
                }))
              }
            />
          </InputGroup>
          <br />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={(e) => onAddProducts(e)}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewProductModal;
