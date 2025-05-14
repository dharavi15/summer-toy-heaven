import React, { useState, useEffect } from "react";
import minusImg from "../../assets/minus-icon-black.svg";
import plusImg from "../../assets/plus-icon-black.svg";
import checkbox from "../../assets/checkbox.png";
import trash from "../../assets/trash.png";
import useCartStore from "../../data/cartStore";
import { useEditMenuStore } from "../../data/menuStore.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";
import { validateInput } from "../../data/validationSchemas.js";

function MenuItem({ productItem, active }) {
  const [touchedInput, setTouchedInput] = useState({ name: false, description: false, price: false, img: false });

  const { addToCart, removeFromCart, cart } = useCartStore();
  const { toggleItemActive } = useCartStore();

  const [form, setForm] = useState({
    storeName: productItem.name,
    storeDescription: productItem.description,
    storePrice: productItem.price,
    storeImg: productItem.img,
  });
 
  const [validation, setValidation] = useState({
    css: {},
    message: {},
    isFormValid: false,
  });
  useEffect(() => {
    const result = validateInput(form, touchedInput);
    setValidation(result);
  }, [form, touchedInput]);

  const {  updateProductItem } = useCartStore();

  useEffect(() => {
    setForm({
      storeName: productItem.name,
      storeDescription: productItem.description,
      storePrice: productItem.price,
      storeImg: productItem.img,
    });
  }, [productItem]);

  useEffect(() => {}, [form]);

  const handleSaveButton = () => {
    updateProductItem(productItem.id, {
      name: form.storeName,
      description: form.storeDescription,
      price: form.storePrice,
      img: form.storeImg,
    });

    toggleItemActive(productItem.id);
  };

  const { removeProductItem } = useCartStore();
  const handleDeleteMenuItem = () => {
    removeProductItem(productItem.id);
  };
  const handleUrlChange = (e) => {
    const url = e.target.value;
    setForm((prev) => ({ ...prev, storeImg: url }));
    setTouchedInput((prev) => ({ ...prev, img: true }));
  };

  const num = cart.find((item) => {
    if (item === undefined) {
      return;
    } else {
      return item.id === productItem.id;
    }
  });

  return (
    <div className="menu-item">
      <div>
        {active ? (
          <>
            <input
              type="text"
              value={form.storeName}
              onChange={(e) => setForm({ ...form, storeName: e.target.value })}
              className="name-input"
              onBlur={() => setTouchedInput({ ...touchedInput, name: true })}
            />
            <p className="name-message">{validation.message.name}</p>
          </>
        ) : (
          <h2>{productItem.name}</h2>
        )}

        {active ? (
          <>
            <input
              type="text"
              value={form.storeDescription}
              onChange={(e) => setForm({ ...form, storeDescription: e.target.value })}
              className="description-input"
              onBlur={() => setTouchedInput({ ...touchedInput, description: true })}
            />
            <p className="description-message">{validation.message.description}</p>
          </>
        ) : (
          <p>{productItem.description}</p>
        )}
      </div>

      <div className={!active ? "menu-flex" : "menu-flex edit-flex"}>
        <div>
          {active ? (
            <>
              <input
                type="number"
                value={form.storePrice}
                onChange={(e) => setForm({ ...form, storePrice: e.target.value })}
                className="price-input"
                onBlur={() => setTouchedInput({ ...touchedInput, price: true })}
              />
              <p className="price-message">{validation.message.price}</p>
            </>
          ) : (
            <p>{productItem.price} :-</p>
          )}

          {!active && (
            <div className="cart-buttons">
              <button onClick={() => removeFromCart(productItem)}>
                <img src={minusImg} alt="minus icon" />
              </button>
              <p>{num?.quantity ?? 0}</p>
              <button onClick={() => addToCart(productItem)}>
                <img src={plusImg} alt="plus icon" />
              </button>
            </div>
          )}
        </div>

        {active ? (
          <>
            <input
              type="url"
              placeholder="https://example.com"
              pattern="https?://.*"
              className="url-input"
              onChange={handleUrlChange}
              onBlur={() => setTouchedInput({ ...touchedInput, img: true })}
            />
            <p className="img-message">{validation.message.img}</p>
          </>
        ) : (
          <img src={productItem.img} alt="info icon" />
          
        )}

        <div className="button-container">
          {!active ? (
            <button className="pencil" onClick={() => toggleItemActive(productItem.id)}>
              <FontAwesomeIcon icon={faPencil} />
              <span className="hover-text">edit</span>
            </button>
          ) : (
            <button className="save-button" disabled={!validation.isFormValid} onClick={handleSaveButton}>
              <img src={checkbox} alt="checkbox icon" />
              <span className="hover-text">save</span>
            </button>
          )}

          <button className="delete-button" onClick={handleDeleteMenuItem}>
            <img src={trash} alt="trash icon" />
            <span className="hover-text">Remove</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuItem;
