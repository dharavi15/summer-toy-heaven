import React, { useState } from "react";
import Joi from "joi";
import "./AddItem.css";
import useCartStore from "../../data/cartStore.js";
import { addMenuItemToFirestore } from "../../data/api";

const schema = Joi.object({
  name: Joi.string()
    .pattern(/^[A-Za-zÅÄÖåäö ,]+$/)
    .required()
    .messages({
      "string.empty": "The name field is mandatory.",
      "string.pattern.base": "The name may only contain letters, spaces and commas",
    }),
  description: Joi.string()
    .pattern(/^[A-Za-zÅÄÖåäö ,]+$/)
    .max(110)
    .required()
    .messages({
      "string.empty": "The description field is mandatory.",
      "string.pattern.base": "The description may only contain letters, spaces and commas.",
    }),
  price: Joi.number().positive().required().messages({
    "number.base": "The price must be a number.",
    "number.positive": "The price must be a positive number.",
    "any.required": "The price field is mandatory.",
  }),
  img: Joi.string().uri().required().messages({
    "string.uri": "Please enter a valid URL.",
    "string.empty": "The URL field is required.",
    "any.required": "The URL field is required.",
  }),
});

const AddItem = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    img: "",
  });

  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { switchAddProductVisible } = useCartStore();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "name" || name === "description") {
      const newValue = value.replace(/[^A-Za-zÅÄÖåäö ,]/g, "");
      setNewItem((prev) => ({ ...prev, [name]: newValue }));
    } else if (name === "price") {
      const numericValue = value.replace(/[^0-9]/g, "");
      setNewItem((prev) => ({ ...prev, [name]: numericValue }));
    } else {
      setNewItem((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddItem = async () => {
    const itemToValidate = {
      ...newItem,
      price: newItem.price === "" ? "" : Number(newItem.price),
    };

    const allFieldsEmpty = Object.values(newItem).every((val) => val.trim() === "");

    if (allFieldsEmpty) {
      setGeneralError("All fields are mandatory.");
      setFieldErrors({});
      return;
    }

    const { error: validationError } = schema.validate(itemToValidate, { abortEarly: false });

    if (validationError) {
      const fieldErrs = {};
      validationError.details.forEach((err) => {
        const field = err.path[0];
        if (!fieldErrs[field]) {
          fieldErrs[field] = err.message;
        }
      });
      setFieldErrors(fieldErrs);
      setGeneralError(""); // Clear general error
      return;
    }

    setGeneralError("");
    setFieldErrors({});

    const item = {
      ...itemToValidate,
      active: false,
    };

    const firestoreId = await addMenuItemToFirestore(item);
    item.id = firestoreId;

    onAddItem(item);

    setNewItem({
      name: "",
      description: "",
      price: "",
      img: "",
    });

    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setNewItem({
      name: "",
      description: "",
      price: "",
      img: "",
    });
    setGeneralError("");
    setFieldErrors({});
  };

  const handleClose = () => {
    switchAddProductVisible(false);
  };

  return (
    <div className="admin-menu-container">
      <button className="close-button" onClick={handleClose}>✖</button>

      {isSubmitted ? (
        <div className="success-message">
          <h2>The product has been added!</h2>
          <button className="add-button" onClick={handleReset}>
            Add a new product
          </button>
        </div>
      ) : (
        <>
          <h2>Product management</h2>
          <div className="admin-menu-form">
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Product name"
                value={newItem.name}
                onChange={handleInputChange}
              />
              {fieldErrors.name && <span className="field-error">{fieldErrors.name}</span>}
            </div>

            <div className="input-group">
              <input
                type="text"
                name="description"
                placeholder="Description"
                value={newItem.description}
                onChange={handleInputChange}
              />
              {fieldErrors.description && <span className="field-error">{fieldErrors.description}</span>}
            </div>

            <div className="input-group">
              <input
                type="number"
                name="price"
                placeholder="Price (SEK)"
                value={newItem.price}
                onChange={handleInputChange}
              />
              {fieldErrors.price && <span className="field-error">{fieldErrors.price}</span>}
            </div>

            <div className="input-group">
              <input
                type="text"
                name="img"
                placeholder="URL"
                value={newItem.img}
                onChange={handleInputChange}
              />
              {fieldErrors.img && <span className="field-error">{fieldErrors.img}</span>}
            </div>

            <div className="admin-menu-form-buttons">
              <button
                className="cancel-button"
                onClick={() =>
                  setNewItem({ name: "", description: "", price: "", img: "" })
                }
              >
                Clear
              </button>
              <button className="add-button" onClick={handleAddItem}>
                Add
              </button>
            </div>
          </div>

          {generalError && <div className="general-error">{generalError}</div>}
        </>
      )}
    </div>
  );
};

export default AddItem;


