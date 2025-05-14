import React, { useState } from "react";
import Joi from "joi";
import "./AddItem.css";
import useCartStore from "../../data/cartStore.js";

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
  category: Joi.string().required().messages({
    "string.empty": "Select a category.",
  }),
});

const AddItem = ({ onAddItem }) => {
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    img: "",
    category: "Water toys",
  });
  const [error, setError] = useState("");
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

  const handleAddItem = () => {
    const itemToValidate = {
      ...newItem,
      price: newItem.price === "" ? "" : Number(newItem.price),
    };

    const { error: validationError } = schema.validate(itemToValidate);

    if (validationError) {
      console.log(validationError.details);
      setError(validationError.details[0].message);
      return;
    }

    const item = {
      ...itemToValidate,
      id: Date.now(),
      active: false,
    };

    onAddItem(item);
    setNewItem({
      name: "",
      description: "",
      price: "",
      img: "",
      category: "Water toys",
    });
    setError("");
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setNewItem({
      name: "",
      description: "",
      price: "",
      img: "",
      category: "Water toys",
    });
    setError("");
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
            <input
              type="text"
              name="name"
              placeholder="Product name"
              value={newItem.name}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="description"
              placeholder="Description"
              value={newItem.description}
              onChange={handleInputChange}
            />
            <input
              type="number"
              name="price"
              placeholder="Price (SEK)"
              value={newItem.price}
              onChange={handleInputChange}
            />
            <input type="text" name="img" placeholder="URL" value={newItem.img} onChange={handleInputChange} />
            <select name="category" value={newItem.category} onChange={handleInputChange}>
              <option value="Water toys">Water toys</option>
              <option value="Beach toys">Beach toys</option>
              <option value="Pool fun">Pool fun</option>
              <option value="Garden play">Garden play</option>
            </select>

            <div className="admin-menu-form-buttons">
              <button
                className="cancel-button"
                onClick={() =>
                  setNewItem({
                    name: "",
                    description: "",
                    price: "",
                    img: "",
                    category: "Water toys",
                  })
                }
              >
                Clear
              </button>
              <button className="add-button" onClick={handleAddItem}>
                Add
              </button>
            </div>
          </div>
          {error && <p className="error-message">{error}</p>}
        </>
      )}
    </div>
  );
};

export default AddItem;
